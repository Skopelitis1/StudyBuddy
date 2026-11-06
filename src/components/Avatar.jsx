// Round avatar with the initials of the student.
function Avatar({ initials, color, size = 'md' }) {
  const sizes = { md: 'h-12 w-12 text-base', lg: 'h-20 w-20 text-2xl' }
  return (
    <div className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${color} ${sizes[size]}`}>
      {initials}
    </div>
  )
}

export default Avatar
