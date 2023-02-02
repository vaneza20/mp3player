import { useRef, useState, useEffect } from "react"
import napster from "../services/napster"

function Player({ song }) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [tracks, setTracks] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const music = useRef()
    const key = "ZTVhYTU3MWEtZjRhNy00MmRmLWJiZDAtNjQwNTAwN2E0ODhi"
    const [musica, setTest] = useState()
    const [images, setImages] = useState()
    useEffect(() => {
        getImagem()
        getMusics()
    }, [])
   
    useEffect(() => {
        console.log(tracks)
    }, [tracks])

    const getMusics = async () => {
        let musics = await napster.get(`albums/alb.686528398/tracks?apikey=${key}`)
        setTest(musics.data.tracks[0])
        setTracks(musics.data.tracks)
    }

    const getImagem = async () => {
        let image = await napster.get(`albums/alb.686528398/images?apikey=${key}`)
        setImages(image.data.images)
    }
    const loadSong = url => {
        music.current.src = url
        play()
    }

    const play = () => {
        music.current.play()
        setIsPlaying(true)
    }

    const pause = () => {
        music.current.pause()
        setIsPlaying(false)
    }

    const next = () => {
        setCurrentIndex(i => i > 19 ?  0 : i + 1)
    }

    const prev = () => {
        setCurrentIndex(i => i < 0 ?  19 : i - 1)
        loadSong(currentIndex)
    }

    return (
        <div>
            <img src={images ? images[0]?.url : ""} alt="" />
            {isPlaying ? (
                <h2>Está tocando a música: {musica?.name} <br/>
                Album: {musica?.albumName}
                </h2>
            ) : (
                <h2>A música está parada</h2>
            )}
            <audio ref={music} src={musica?.previewURL} ></audio>
            <button>Anterior</button>
            <button onClick={ isPlaying ? pause : play}>
                { isPlaying ? "pause" : "play"}
            </button>
            <button onClick={ next }>Próximo</button>
        </div>
    )
}

export default Player