import {Tab} from '../components/tab.jsx'
import './home.css'
import lupa from '../assets/lupa.gif'
import paisaje from '../assets/paisaje.png'
import animal from '../assets/animal.png'
import ciudad from '../assets/ciudad.png'
import like_w from '../assets/like-white.png'
import like_g from '../assets/like-green.png'
import { useEffect, useState,useRef} from 'react'

export function Home(){

    let [modal, setModal] = useState('')
    let [imgModal, setImgModal] = useState(null)
    let [num, setNum] = useState(3)
    let [texto, setTexto] = useState('') 
    let [search, setSearch] = useState('japan')
    let [data, setData] = useState([])
    let di = useRef()

    useEffect(()=>{
        window.innerWidth < 700 ? setNum(2) : setNum(3)
    },[])

    useEffect(()=>{
        const apiKey = 'WmYIsMUsjPxAma45RL5qbz8faBylSkFNZypb28inJzriYubwb1OoRNG0'
        const apiUrl = `https://api.pexels.com/v1/search?query=${search}&page=${1}&per_page=${30}`

        fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': apiKey,
        },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setData(data.photos)
        })

    },[search])

    let [im, setIm] = useState(null)

    function verImagen(e){
        setModal('open')
        setImgModal(e.target.src)
        di.current.style.bottom='30px'
        di.current.style.transform='translate(0px, 100px)'
        fetch(e.target.src)
        .then(res => res.blob())
        .then(blob => setIm(URL.createObjectURL(blob)))
    }

    function descargarImg(e){
        e.target.download = 'im'
    }

    return(
        <>
            <div className='principal'>
                <h1>Increíbles Imágenes Gratis Para Descargar</h1>
                <nav className="nav">
                    <form className='form' onSubmit={(e)=>{
                        e.preventDefault()
                        setSearch(texto)
                        }}>
                        <input type="text" placeholder='Buscar imagen' onChange={(e)=>{
                            setTexto(e.target.value)
                        }} />
                        <button><img src={lupa} alt="lupa" width='35px'/></button> 
                    </form>
                </nav>
                
            </div>
            <div className="busqueda">
                <Tab setSearch={setSearch} buscar='landscape' img={paisaje} titulo='Paisaje'/>
                <Tab setSearch={setSearch} buscar='animals' img={animal} titulo='Animales'/>
                <Tab setSearch={setSearch} buscar='city' img={ciudad} titulo='Ciudades'/>
            </div>
            <div className="galeria">
                <div className="column">
                    {data.map((e,i)=> i%num ==  0 ? <img src={e.src.large} key={i} onClick={(e)=> verImagen(e) } /> : '')}
                </div>
                <div className="column">
                    {data.map((e,i)=> i%num ==  1 ? <img src={e.src.large} key={i} onClick={(e)=> verImagen(e) } /> : '')}
                </div>
                {num == 3 ? <div className="column cu">
                    {data.map((e,i)=> i%num ==  2 ? <img src={e.src.large} key={i} onClick={(e)=> verImagen(e) } /> : '')}
                </div> : ''
                }
                
            </div>
            <dialog open={modal}>
                <div className="caja">
                    <img src={imgModal} alt="imagenModal" />
                    <div className="like">
                        <img src={like_w} alt="like" onClick={(e)=> {e.target.src.includes('white') ? e.target.src = like_g : e.target.src = like_w}} />
                        <a  href={im} onClick={(e)=> descargarImg(e)}>Descargar</a>
                    </div>
                </div>
                <button ref={di} onClick={(e)=> {setModal(false); di.current.style.bottom='200px'}}>✕</button>
            </dialog>
        </>
    )
}