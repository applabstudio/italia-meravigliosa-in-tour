import React from "react"

const Comment = ({ user, text }: { user: string; text: string }) => {
  return (
    <div className="my-4 flex w-full flex-col divide-y-2">
      <p className="text-lg font-medium text-gray-800">{user}</p>
      <p className="pt-2 text-sm text-gray-700">{text}</p>
    </div>
  )
}

export default Comment
