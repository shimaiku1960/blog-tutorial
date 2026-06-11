import { createClient } from "@/lib/supabase/server";                                                                        
import { redirect } from "next/navigation";                                                                                  
import TodoList from "@/app/components/TodoList";                                                                            
import prisma from "@/lib/prisma";
                                                                                                                           
const TodosPage = async () => {                                                                                              
  const supabase = await createClient();                                                                                   
  const { data: { user } } = await supabase.auth.getUser();                                                                  
 
  if (!user) {                                                                                                               
    redirect("/login");                                                                                                    
  } 
  const todos = await prisma.todo.findMany({
    where: { profileId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (                                                                                                                   
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold mb-6">Todo</h1> 
      <TodoList initialTodos={todos} />                                                                    
                                                                                                              
    </main>                                                                  
  );                                                                          
};                                    

export default TodosPage;  