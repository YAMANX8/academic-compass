import React from 'react'
import { useParams } from 'react-router-dom'

const CourseInfo = () => {
  const { id } = useParams();
  return (
    <div>{id}</div>
  )
}

export default CourseInfo