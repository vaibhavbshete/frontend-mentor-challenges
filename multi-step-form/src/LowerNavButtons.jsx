export function LowerNavButtons({ currentPage, setCurrentPage, successfulSubmit, validateAndGoFurther, setSuccessfulSubmit, minPage = 1, maxPage = 4 }) {
    
    return !successfulSubmit && (
        <div className='lower-nav-wrap'>
            {(currentPage > minPage && currentPage <= maxPage) ?
                <a className='mr-auto' style={{color:'var(--cool-gray)'}} onClick={()=>setCurrentPage(currentPage - 1)}>Go Back</a>
                :
                ''
            }
            {(currentPage<maxPage)?
                <button className="form-button ml-auto"  onClick={validateAndGoFurther}  type="button">Next Step</button>:''
            }
            {(currentPage==maxPage)?
                <button className="form-button ml-auto"  onClick={()=>setSuccessfulSubmit(true)}  type="button">Confirm</button>:''
            }
        </div>
    )
}