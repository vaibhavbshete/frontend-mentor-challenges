export function PageButton({ pNumber, text, currentPage, pageSetter }) {
    // console.log(pageSetter);
    return (
        <button className={"sidebar-button-flex " + (currentPage == pNumber?"active":'')} type="button" onClick={()=>{pageSetter(pNumber)}}>
            <div className="step-count-round">{ pNumber}</div>
            <div className="step-info-wrap">
                <div className="step-count-text">Step { pNumber }</div>
                <div className="step-info">{text}</div>
            </div>
        </button>
    )
}