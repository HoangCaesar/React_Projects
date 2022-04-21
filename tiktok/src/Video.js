import { forwardRef, useImperativeHandle, useRef } from 'react'
import tiktok from './videos/tiktok.mp4'

function Video(props, ref) {

    const videoRef = useRef()

    useImperativeHandle(ref, () => ({
        play() {
            videoRef.current.play()
        },
        pause() {
            videoRef.current.pause()
        }
    }))

    return (
        <video
            ref={videoRef}
            src={tiktok}
            width={300}
            height={300}
        />
    )
}

export default forwardRef(Video)