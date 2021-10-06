import React from 'react'
import PricingDetailsPage from '../../components/airPricing/pricingDetailsPage';

const  PriceIndexPage = (params) => {
    return (
        <PricingDetailsPage />
    )
}


export async function getStaticProps({ params: {slug} }) {
    // ↓add 
    console.log(`BookingPage slug: ${slug}`)
  }

export default PriceIndexPage;