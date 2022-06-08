import React from 'react'

const Newsletter = () => {
  return (
    <section className="section-newsletter">
                <div className="newsletter-inner">
                    <div>
                        <div className="newsletter-title">
                            enter the world of versace
                        </div>
                        <div className="newsletter-desc">
                            Hear about exclusive events, collections and news.
                        </div>
                        <div className="newsletter-input-container">
                            <input className="newsletter-input" placeholder="Enter email address" type="text" />
                            <i className="icon-arrow-right-bold" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="newsletter-icons">
                        <i className="icon instagram" aria-hidden="true"></i>
                        <i className="icon facebook" aria-hidden="true"></i>
                        <i className="icon twitter" aria-hidden="true"></i>
                        <i className="icon pinterest" aria-hidden="true"></i>
                        <i className="icon youtube" aria-hidden="true"></i>
                        <i className="icon linkedin" aria-hidden="true"></i>
                    </div>
                </div>
            </section>
  )
}

export default Newsletter