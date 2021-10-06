import React, { Component } from 'react'
import AirSearchResult from '../../components/airSearch/SearchResults/AirSearchResult';

class SearchResultPage extends Component {
    render() {
        return (
            <AirSearchResult />
        )
    }
}


export async function getStaticProps({ params: {slug} }) {
    // ↓add 
    console.log(`BookingPage slug: ${slug}`)
  }

export default SearchResultPage;