export function FormPage({ pageNo, pageTurner, formData, setFormData, plans, addOns }) {
    
    let retHtml = ''
    switch (pageNo) {
        case 1:
            retHtml= (
            <fieldset className="step-panel" >
                <h2 className='legend'>Personal info</h2>
                <div className="desc">
                    Please provide your name, email address, and phone number.
                </div>
            
                <div className="input-group">
                    <label for="name-input">Name</label>
                    <input type="text" name="name" id="name-input" placeholder="e.g. Stephen King" />
                </div>
                <div className="input-group">
                    <label for="email-input">Email Address</label>
                    <input type="email" name="email" id="email-input" placeholder="e.g. stephenking@lorem.com" />
                </div>
                <div className="input-group">
                    <label for="phone-no-input">Phone Number</label>
                    <input type="tel" name="phone-no" id="phone-no-input" placeholder="e.g. +1 234 567 890" />
                </div>
                {/* <LowerNavButtons currentPage={pageNo} setCurrentPage={(x)=>pageTurner(x)}/> */}
                    
            </fieldset>
          )
            break;
        case 2:
            retHtml= (
                <fieldset className="step-panel">
                    <h2 className='legend'>Select your plan</h2>
                    <div className="desc">
                        You have the option of monthly or yearly billing.
                    </div>
                    <div className='plans-wrapper'>
                        {plans.map((plan, index) => <PlanBox
                            key={index}
                            planName={plan.name}
                            planValue={plan.value}
                            monthlyRate={plan.monthlyRate}
                            yearlyRate={plan.yearlyRate}
                            formData={formData}
                            setFormData={(val) => setFormData(val)}
                            iconUrl={plan.iconUrl}
                        />
                        )}
                    </div>
            
                    <div className="select-plan-type-bg" >
                        <div className="center-wrap">
                            <div className={"center-left " + (!formData.isYearly ? 'text-primary':'text-secondary')}>Monthly</div>
                            <div className='switch-check center-center'>
                                <input type="checkbox" id="planType" defaultChecked={formData.isYearly } onChange={(event) => {
                                    // console.log(event.target.checked)
                                    let oldFormData = structuredClone(formData)
                                    oldFormData.isYearly = event.target.checked
                                    setFormData(oldFormData)
                                    // console.log(formData);
                                }} />
                                <label htmlFor="planType"></label>
                            </div>
                            <div className={"center-right " + (formData.isYearly ? 'text-primary':'text-secondary')}>Yearly</div>
                        </div>
                    </div>
                    {/* <LowerNavButtons currentPage={pageNo} setCurrentPage={(x)=>pageTurner(x)}/> */}
                    
                </fieldset>
            )
            break;
        case 3:
            retHtml = (
            <fieldset className="step-panel">
                <h2 className='legend'>Pick add-ons</h2>
                <div className="desc">
                    Add-ons help enhance your gaming experience.
                </div>
            
                    {
                        addOns.map((addon, index) => <AddonBox
                            key={index}
                            addonName={addon.name} addonValue={addon.value}
                            description={addon.description}
                            formData={formData}
                            setFormData={(val) => setFormData(val)}
                            monthlyRate={addon.monthlyRate} yearlyRate={addon.yearlyRate}
                        />)
                    }
                    
            
                

            </fieldset>
        
            )
            break;
        case 4:
            retHtml = (
                
            <fieldset className="step-panel">
                <h2 className='legend'>Finishing up</h2>
                <div className="desc">
                    Double-check everything looks OK before confirming.
                </div>
                    
                        {(() => {
                            // let { isYearly, plan,addons } = formData
                            let selectedPlan = plans.find(plan => plan.value == formData.plan)
                            let selectedAddOns = addOns.filter(addon => formData.addons.includes (addon.value ))
                            // console.log(addOns,selectedAddOns,formData.addons);
                            return (<>
                                <div className='totals-wrapper bg-alabaster'>
                                    <div className="total-row">
                                        <div>
                                            <b>{selectedPlan.name} ({formData.isYearly ? 'Yearly' : 'Monthly'})</b><br></br>
                                            <button className='btn-link text-secondary' type='button' onClick={()=>pageTurner(2) }>Change</button>
                                        </div>
                                        <div className='font-semibold'>${formData.isYearly ? selectedPlan.yearlyRate + '/yr' : selectedPlan.monthlyRate + '/mo'}</div>
                                
                                    </div>
                                    <hr />
                                {
                                selectedAddOns.map(addon => <div className='total-row'>
                                    <div className='font-semibold text-secondary'>{addon.name}</div>
                                    <div className='font-semibold'>+${ formData.isYearly ? addon.yearlyRate + '/yr' : addon.monthlyRate + '/mo' }</div>
                                </div>)
                                }
                                </div>
                                <div className="totals-wrapper">
                                    <div className="total-row">
                                        <div className='text-secondary font-semibold'>Total (per {formData.isYearly? 'year':'month'})</div>
                                        <div className='font-semibold'>+${(() => {
                                                return (
                                                    (formData.isYearly ? selectedPlan.yearlyRate : selectedPlan.monthlyRate) + (selectedAddOns.reduce((carry, sAddon) => (formData.isYearly ? sAddon.yearlyRate : sAddon.monthlyRate) + carry, 0))) + (formData.isYearly ? '/yr' : '/mo')
                                        })()}
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })()}
                    
                    
                    
                        
            
            
                
                
                {/* <LowerNavButtons currentPage={pageNo} setCurrentPage={(x)=>pageTurner(x)}/> */}

            </fieldset>
        
            )
            break;
        case 5:
            retHtml = (
                ''
            )
            break;
        default:
            retHtml = pageNo
            break;
    }

    return (
        <>
          
            {retHtml}
            {/* <LowerNavButtons currentPage={pageNo} setCurrentPage={(x)=>pageTurner(x)}/> */}
        </>
    )
}

function totalRow() {
    return <></>
}


function PlanBox({ planName, planValue,yearlyRate,monthlyRate, iconUrl,formData,setFormData }) {
    return (<div className='plan-box-wrap'>
        <input type="radio" name='plan'
            id={planName + '_radio_inp'}
            defaultChecked={formData.plan == planValue ? 'checked' : ''}
            onChange={(event) => {
                let { checked } = event.target
                let newFormData = structuredClone(formData)
                if (checked) {
                    newFormData.plan = planValue
                }
                setFormData(newFormData)
            }}
        />
        <label className="plan-box" htmlFor={ planName + '_radio_inp'}>
            <img className='icon' src={iconUrl} alt={ planName + ' icon' } />
            <div>
                <div className='text-primary font-semibold'>{planName}</div>
                <div className="plan-rate text-secondary">
                    ${formData.isYearly ? yearlyRate + '/yr': monthlyRate +'/mo'}
                </div>
                <div className={'plan-extra ' + (formData.isYearly ? 'shown':'')}>
                    {formData.isYearly ? '2 months free':''}
                </div>
            </div>
        </label>
    </div>)
}

function AddonBox({ addonName,addonValue, description, formData,setFormData, yearlyRate, monthlyRate }) {
    return(<div className="plan-box-wrap">
        <input type="checkbox" name='addon[]' value={addonValue} id={addonValue + '_chk_inp'}
            defaultChecked={formData.addons.find(item => item == addonValue)}
            onChange={(event) => {
        
                let newFormData = structuredClone(formData);
                let { checked, value } = event.target;
                console.log(checked);
                if (checked) {
                    newFormData.addons = [...newFormData.addons, value]
                }
                else {
                    newFormData.addons = newFormData.addons.filter(item=>item!=value)
                }
                setFormData(newFormData)
            }}
        />
        <label className='plan-box' htmlFor={addonValue + '_chk_inp'} >
            <div className='chk-bg'></div>
            <div>
                {addonName}
                <div className='text-secondary'>{description} ${ formData.isYearly ? yearlyRate+'/yr':monthlyRate + '/mo' }</div>
            </div>
        </label>
    </div>)
}