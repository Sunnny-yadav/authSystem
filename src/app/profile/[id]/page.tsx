
import React from 'react'

function Profile({params}: any) {
  return (
    <div>Profile <span className='p-2 bg-orange-500 rounded '>{params.id}</span></div>
  )
}

export default Profile