import FoodCard from './FoodCard'

export default function FoodGrid({ foods, selectedFoods, onToggle }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
      {foods.map(food => (
        <FoodCard
          key={food.id}
          food={food}
          selected={selectedFoods.includes(food.id)}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
