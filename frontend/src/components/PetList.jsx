import PetCard from "./PetCard";

const PetList = ({ pets, onRefresh, onEdit }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {pets.map((pet) => (
      <PetCard
        key={pet._id}
        pet={pet}
        onRefresh={onRefresh}
        onEdit={onEdit}
      />
    ))}
  </div>
);

export default PetList;