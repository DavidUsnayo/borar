
export function Tab({setSearch,buscar,img,titulo}){
    return(
        <div onClick={()=> setSearch(buscar)}>
            <img src={img} alt="foto" />
            <p> {titulo} </p>
        </div>
    )
}