export class ElevatorSounds {
  private audioContext: AudioContext | null = null
  private isEnabled = true
  private volume = 0.3

  constructor() {
    // Initialize audio context on first user interaction
    document.addEventListener('click', this.initializeAudio.bind(this), { once: true })
  }

  private async initializeAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): Promise<void> {
    return new Promise((resolve) => {
      if (!this.audioContext || !this.isEnabled) {
        resolve()
        return
      }

      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)
      oscillator.type = type

      // Fade in and out for smoother sound
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume, this.audioContext.currentTime + 0.01)
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration - 0.01)

      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration)

      oscillator.onended = () => resolve()
    })
  }

  private createNoise(duration: number, lowFreq: number, _highFreq: number): Promise<void> {
    return new Promise((resolve) => {
      if (!this.audioContext || !this.isEnabled) {
        resolve()
        return
      }

      // Create white noise
      const bufferSize = this.audioContext.sampleRate * duration
      const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
      const data = buffer.getChannelData(0)

      // Generate filtered white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.1
      }

      const source = this.audioContext.createBufferSource()
      const filter = this.audioContext.createBiquadFilter()
      const gainNode = this.audioContext.createGain()

      source.buffer = buffer
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(lowFreq, this.audioContext.currentTime)
      filter.Q.setValueAtTime(1, this.audioContext.currentTime)

      source.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration - 0.1)

      source.start(this.audioContext.currentTime)
      source.stop(this.audioContext.currentTime + duration)

      source.onended = () => resolve()
    })
  }

  // Elevator motor sound (moving between floors)
  async playMovingSound(direction: 'up' | 'down', duration: number = 1.5) {
    if (!this.isEnabled || !this.audioContext) return

    await this.initializeAudio()

    // Combine motor hum with mechanical noise
    const promises = []

    // Motor hum - different frequencies for up/down
    const baseFreq = direction === 'up' ? 120 : 80
    promises.push(this.createTone(baseFreq, duration, 'sawtooth'))
    promises.push(this.createTone(baseFreq * 1.5, duration, 'square'))

    // Mechanical noise
    promises.push(this.createNoise(duration, 50, 200))

    await Promise.all(promises)
  }

  // Elevator arrival "ding" sound
  async playDingSound() {
    if (!this.isEnabled || !this.audioContext) return

    await this.initializeAudio()

    // Classic elevator ding - two tone chime
    await this.createTone(800, 0.3, 'sine')
    await new Promise(resolve => setTimeout(resolve, 50))
    await this.createTone(600, 0.4, 'sine')
  }

  // Door opening sound
  async playDoorSound() {
    if (!this.isEnabled || !this.audioContext) return

    await this.initializeAudio()

    // Pneumatic door sound
    const promises = []
    promises.push(this.createNoise(0.8, 200, 500))
    promises.push(this.createTone(150, 0.3, 'square'))

    await Promise.all(promises)
  }

  // Button press sound
  async playButtonSound() {
    if (!this.isEnabled || !this.audioContext) return

    await this.initializeAudio()

    // Quick click sound
    await this.createTone(1200, 0.1, 'square')
  }

  // Stop all sounds
  stopAll() {
    if (this.audioContext) {
      // Create new context to stop all sounds
      this.audioContext.close()
      this.audioContext = null
    }
  }
}

// Export singleton instance
export const elevatorSounds = new ElevatorSounds()