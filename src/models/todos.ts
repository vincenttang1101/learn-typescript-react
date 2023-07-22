import * as mongoose from 'mongoose'
import { Model } from 'mongoose'

type TodoType = TodoModel & mongoose.Document

export interface TodoModel {
  title: {
    type: String
    required: true
  }
  isCompleted: {
    type: Boolean
    required: true
  }
}

const TodosSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  }
})

const Todo: Model<TodoType> = mongoose.model<TodoType>('Todos', TodosSchema)

export default Todo
