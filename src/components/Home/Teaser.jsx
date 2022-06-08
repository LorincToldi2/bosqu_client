import React from 'react'

import teaserImage from '../../assets/images/teaser.webp'
import teaserImageSmall from '../../assets/images/teaser-small.jpg'

const Teaser = () => {
  return (
    <section className="section-teaser">
                <div className="teaser-image-container">
                    <img className="teaser-image teaser-big" src={teaserImage} alt="" />
                    <img className="teaser-image teaser-small" src={teaserImageSmall} alt="" />
                </div>
                <div className="teaser-text-container">
                    <div className="teaser-text-inner">
                        <div className="teaser-title">
                            fabulously fendace
                        </div>
                        <div className="teaser-desc">
                            Fun logoism is fully embraced as Fendi and Versace brand codes combine to create unique design with respect for each fashion house at the core.
                        </div>
                        <div className="teaser-button">
                            shop women's
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default Teaser