import React from 'react'
import Stories from 'react-insta-stories'
import "./StorieMain.css"

const InInStory = ({ storyInstance, story, setViewStory, caption }) => {
  return (
    <div className='InInStory'>
      <div className='adj-story adj-main-story'>
        <Stories
          stories={storyInstance}
          defaultInterval={100}
          width={420}
          height={500}
          className='centered-stories'
        />
        <div className='style-caption'>
          <h4 className='name-story'>{caption}</h4>
        </div>
      </div>
    </div>
  )
}

export default InInStory
