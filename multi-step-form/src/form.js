import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import { PageButton } from './PageButton.jsx';
import { LowerNavButtons } from './LowerNavButtons.jsx';
import { FormPage } from './FormPage.jsx';






function MultiStepForm() {
    const [currentPage, setCurrentPage] = useState(1);
    const [successfulSubmit, setSuccessfulSubmit] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', isYearly: true, plan: 'advanced', addons: [] });
    const [formErrors,setFormErrors] = useState({});
    const plans = [
        { name: 'Arcade', value: 'arcade', monthlyRate: 9, yearlyRate: 90, yearlyExtra: '2 months free',iconUrl:"assets/images/icon-arcade.svg" },
        { name: 'Advanced', value: 'advanced', monthlyRate: 12, yearlyRate: 120, yearlyExtra: '2 months free',iconUrl:"assets/images/icon-advanced.svg"  },
        { name: 'Pro', value: 'pro', monthlyRate: 15, yearlyRate: 150, yearlyExtra: '2 months free',iconUrl:"assets/images/icon-pro.svg"  },
    ];
    const addOns = [
        {name:'Online Service',value:'online-service',description:'Access to multiplayer games',monthlyRate:1,yearlyRate:10},
        {name:'Larger Storage',value:'larger-storage',description:'Extra 1TB of cloud save',monthlyRate:2,yearlyRate:20},
        {name:'Customizable Profile',value:'custom-profile',description:'Custom theme on your profile',monthlyRate:1,yearlyRate:20},
    ]
    function validateAndGoFurther() {
        if (currentPage == 1) {
            let newFormErrors = {};
            if (!formData.name) {
                newFormErrors.name = 'Please enter your name';
            }
            if (!formData.email) {
                newFormErrors.email = 'Please enter your email';
            }
            if (!formData.phone) {
                newFormErrors.phone = 'Please enter your phone number';
            }
           
            if (Object.keys(newFormErrors).length) {
                setFormErrors(newFormErrors);
                return false;
            }
        }
        setCurrentPage(currentPage + 1)
    }
    return (<>
            <form class="form-with-sidebar" action="#" method="POST" >
                
            
                <div className="sidebar">
                        <PageButton pNumber={1} disabled={!successfulSubmit} text="Your Info" currentPage={currentPage } pageSetter={(pN) => { setCurrentPage(pN) }}/>
                        <PageButton pNumber={2} disabled={!successfulSubmit} text="Select plan" currentPage={currentPage} pageSetter={(pN) => { setCurrentPage(pN) }}/>
                        <PageButton pNumber={3} disabled={!successfulSubmit} text="Add-ons" currentPage={currentPage} pageSetter={(pN) => { setCurrentPage(pN) }}/>
                        <PageButton pNumber={4} disabled={!successfulSubmit} text="Summary" currentPage={currentPage} pageSetter={(pN) => { setCurrentPage(pN) }}/>
                    
                </div>
                <div class="form-main">
                    <div class="form-relative-wrap">
        
                <div className="steps">
                    {
                        (successfulSubmit)? 
                            
                    (<div className="step-panel final success-panel">
                        <img className='icon' src='assets/images/icon-thank-you.svg' alt='thank you icon' />
                        <h2 className='legend'>Thank you!</h2>
                            
                        <p className="desc">
                            Thanks for confirming your subscription! We hope you have fun
                            using our platform. If you ever need support, please feel free
                            to email us at support@loremgaming.com.
                        </p>
                
                
                
                    </div>)
                        
                                : <FormPage pageNo={currentPage} pageTurner={setCurrentPage} formData={formData} plans={plans} addOns={addOns} setFormData={(data) => setFormData(data)} formErrors={formErrors } />
                    }
                           
                    
                <LowerNavButtons currentPage={currentPage} setCurrentPage={(x) => setCurrentPage(x)} validateAndGoFurther={validateAndGoFurther} successfulSubmit={successfulSubmit} setSuccessfulSubmit={ setSuccessfulSubmit} />
                        </div>
        
                    </div>
                </div>
            </form>
        </>
    )
}
const root = createRoot(document.getElementById('app'));
root.render(<MultiStepForm />);