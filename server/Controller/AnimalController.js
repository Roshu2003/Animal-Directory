import Animal from "../Model/AnimalModel.js";

export const create = async (req, res) => {
  try {
    const animalData = new Animal(req.body);
    if (!animalData) {
      return res.status(404).json({ message: "Animal data is required." });
    }
    const savedAnimal = await animalData.save();
    res.status(201).json(savedAnimal);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
export const getAll = async (req, res) => {
  try {
    const animals = await Animal.find();
    if (!animals) {
      return res.status(404).json({ message: "Animal Not found." });
    }
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getOne = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: "Animal Not found." });
    }
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const update = async (req, res) => {
  try {
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal Not found." });
    }
    res.status(200).json({ message: "Animal updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deleteanimal = async (req, res) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) {
      return res.status(404).json({ message: "Animal Not found." });
    }
    res.status(200).json({ message: "Animal deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
