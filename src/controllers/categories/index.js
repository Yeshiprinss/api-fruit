import CategoryModel from "../../models/categories/index.js"


const CategoriesControllers = {
  getAllCategories: async (req, res) => {
    try {
      if (req.query.name) 
      {
        const name = req.query.name
        const categoryByName = await CategoryModel.getCategoryByName(name)
        res.send(categoryByName)
      }
      else{
        const allCategories = await CategoryModel.getAllCategory()
        res.send(allCategories)
        return; 
      }
    } catch (error) {
      throw error
    }
  },
  getCategoryById: async (req, res) => {
    try {
      if (!req.params.id) throw new Error("No id provided")
      const category = await CategoryModel.getCategoryById(req.params.id)
      res.send(category)
    } catch (error) {
      throw error
    }
  },
  createCategory: async (req, res) => {
    try {
      const category = await CategoryModel.createCategory(req.body.name)
      res.send(category)
    } catch (error) {
      throw error
    }
  },
  updateCategory: async (req, res) => {
    try {
      const category = await CategoryModel.updateCategory(req.params.id, req.body.name)
      res.send(category)
    } catch (error) {
      throw error
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const category = await CategoryModel.deleteCategory(req.params.id)
      res.send(category)
    } catch (error) {
      throw error
    }
  }
}

export default CategoriesControllers