import Image from 'next/image'

export default function Avatar({ author }) {
  const isAuthorHaveFullName = author?.firstName && author?.lastName
  const name = isAuthorHaveFullName
    ? `${author.firstName} ${author.lastName}`
    : author.name || null

  return (
    <div className="flex items-center">
      <div className="w-12 h-12 relative mr-4">
        <Image
          src={author.avatar_URL}
          layout="fill"
          className="rounded-full"
          alt={name}
        />
      </div>
      <div className="text-xl font-bold">{name}</div>
    </div>
  )
}
