export default function Categories({ categories }) {
  return (
    <span className="ml-1">
      under
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <span key={index} className="ml-1">
            {category.name}
          </span>
        ))
      ) : (
        <span className="ml-1">{categories.name}</span>
      )}
    </span>
  )
}
