import { defineStore } from 'pinia'
import artist from '../artist.json'

export const useSongStore = defineStore('song', {
	state: () => ({
		isPlaying: false,
		audio: null,
		currentArtist: null,
		currentTrack: null
	}),
	actions: {
		loadSong(artist, track) {
			this.currentArtist = artist
			this.currentTrack = track

			if (this.audio && this.audio.src) {
				this.audio.pause
				this.isPlaying = false
				this.audio.src
			}

			this.audio = new Audio()
			this.audio.src = track.path

			setTimeout(() => {
				this.isPlaying = true
				this.audio.play()
			}, 200)
		},
		playOrPauseSong() {
			console.log(this.audio)
			if (this.audio.pause) {
				this.isPlaying = true
				this.audio.play()
			} else {
				this.isPlaying = false
				this.audio.pause()
			}
		},
		playOrPauseThisSong(artist, track) {
			console.log(this.audio)
			console.log(artist)
			console.log(track)
			if (!this.audio || !this.audio.src || (this.currentTrack.id !== track.id)) {
				this.loadSong(artist, track)
				return
			}
			this.playOrPauseSong()
		},
		prevSong(currentTrack) {
			let track = artist.tracks[currentTrack.id - 2]
			this.loadSong(artist, track)
		},
		nextSong(currentTrack) {
			if (currentTrack.id === artist.track.length) {
				let track = artist.tracks[0]
				this.loadSong(artist, track)
			} else {
				let track = artist.tracks[currentTrack.id]
				this.loadSong(artist, track)
			}
		},
		playFromFirst() {
			this.resetState()
			let track = artist.tracks[0]
			this.loadSong(artist, track)
		},
		resetState() {
			isPlaying = false
			audio = null
			currentArtist = null
			currentTrack = null	
		}
	},

	persist: true
})
