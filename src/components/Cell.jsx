export default function Cell({id, isCircleTurn, setIsCircleTurn, cells, setCells }) {

    const handleClick = (e) => {
        const clickedCell = e.currentTarget.firstChild
        const isTaken = clickedCell.classList.contains('circle') || clickedCell.classList.contains('cross')
        const currentSymbol = isCircleTurn ? 'circle' : 'cross'
        
        if(!isTaken) {
            clickedCell.classList.add(currentSymbol)
            setIsCircleTurn(!isCircleTurn)
            setCellsState(currentSymbol)
        }

        

    }

    const setCellsState = (currentSymbol) => {
        const changedCell = cells.map((cell, index) => {
            if(index === id) {
                return currentSymbol
            } else {
                return cell
            }
        })
        setCells(changedCell)
    }

    return (
        <>
            <div className="cell" onClick={(e) => { handleClick(e) }}>
                <div className="choosen-symbol" id={id}></div>  
            </div>
        </>
    )
}