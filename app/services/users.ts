import { eq} from "drizzle-orm"
import { db } from "../../db"
import { users} from "../../db/schema"


export const getUsers = () => {
    return db.query.users.findMany()
}

export const getUserById = async (id: number) => {
  return db.query.users.findFirst({
    where: eq(users.id, id),
  })
}

export const getUserWithNotes = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}