'use client'
import { Toggle } from "@/components/tailgrids/core/toggle";
import {
 NativeSelect, NativeSelectOption} from "@/components/tailgrids/core/native-select";

 import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow
} from "@/components/tailgrids/core/table";

import { Pagination } from "@/components/tailgrids/core/pagination";
import { Badge } from "@/components/tailgrids/core/badge";
import { ClockThree, Plus, Trash1 } from "@tailgrids/icons";
import { useEffect, useState } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { fetchTodos, type Todo, isTodoList } from "@/data/todos";

export default function TodosPage() {

  const [todosRaw, setTodosRaw] = useState<Todo[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [storageReady, setStorageReady] = useState(false);
  const [message, setMessage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [title, setTitle] = useState('');

  // Local Storage => todosRaw (โหลดครั้งแรกเท่านั้น)
  useEffect(() => {
    let active = true;
    const loadTodos = async () => {
      try {
        const todoRawStr = localStorage.getItem('todosRaw');
        const data: unknown = todoRawStr === null
          ? await fetchTodos()
          : JSON.parse(todoRawStr);
        if (!isTodoList(data)) throw new Error('Invalid todos');
        if (active) {
          setTodosRaw(data);
          setStorageReady(true);
        }
      } catch {
        if (active) setMessage('โหลดข้อมูลไม่ได้ กรุณาตรวจ Local Storage แล้วรีเฟรช (ข้อมูลเดิมยังไม่ถูกเขียนทับ)');
      } finally {
        if (active) setLoading(false);
      }
    };
    loadTodos();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!storageReady) return;
    try {
      localStorage.setItem('todosRaw', JSON.stringify(todosRaw));
    } catch {
      
      setMessage('บันทึกข้อมูลไม่ได้ ข้อมูลที่แก้อาจหายเมื่อรีเฟรช');
    }
  }, [todosRaw, storageReady]);

  
  useEffect(() => {
    const selectedItems = todosRaw.filter((todo) => !onlyWaiting || !todo.completed);
    
    setTodos(selectedItems);
  }, [todosRaw, onlyWaiting]);


  useEffect(() => {
    
    setTotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);


  useEffect(() => {
    
    setCurrentPage((page) => totalPages === 0 ? 0 : Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const handlePageChange = (page: number) => {
    setCurrentPage(totalPages === 0 ? 0 : Math.max(1, Math.min(page, totalPages)));
  };

  // delete
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  // make done
  const makeDone = (id: number) => {
    setTodosRaw(todosRaw.map((todo) => todo.id === id ? { ...todo, completed: true } : todo));
  };

  const openAddDialog = () => {
    setEditId(null);
    setTitle('');
    setShowDialog(true);
  };

  const editTodo = (todo: Todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setShowDialog(true);
  };

  // add new todo / edit title
  const addTodo = () => {
    if (!title.trim()) return;
    if (editId === null) {
      const id = todosRaw.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
      const newTodo: Todo = { userId: 1, id, title: title.trim(), completed: false };
      setTodosRaw([...todosRaw, newTodo]);
      const count = todos.length + 1;
      setCurrentPage(Math.ceil(count / itemsPerPage));
    } else {
      setTodosRaw(todosRaw.map((todo) => todo.id === editId ? { ...todo, title: title.trim() } : todo));
    }
    setShowDialog(false);
  };

  return (
    // todos container
    <div className="mt-4 max-w-3xl mx-auto px-2">
      {message && <p role="alert" className="mb-3 text-red-600">{message}</p>}
      {/* controller */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        {/*toggle & badge*/}
        <div className="flex items-center gap-2">
          <Toggle label="Show only" checked={onlyWaiting} onChange={(event) => setOnlyWaiting(event.target.checked)} />
          <Badge
            className="bg-amber-400 text-black rounded-lg px-2.5 py-1 text-sm font-medium gap-1.5 [&>svg]:text-black [&>svg]:size-4"
            suffixIcon={<ClockThree />}
          >
            waiting
          </Badge>
        </div>

        {/*drop Down*/}
        <div className="w-52 shrink-0">
          <NativeSelect aria-label="Items per page" value={itemsPerPage} onChange={(event) => setItemsPerPage(Number(event.target.value))}>
            <NativeSelectOption value="5">5 items per Page</NativeSelectOption>
            <NativeSelectOption value="10">10 items per Page</NativeSelectOption>
            <NativeSelectOption value="50">50 items per Page</NativeSelectOption>
          </NativeSelect>
        </div>

      </div>

      {/* table */}
      <div className="mt-4">
        <TableRoot>
          <TableHeader className="bg-zinc-800">
            <TableRow className="border-none">
              <TableHead scope="col" className="text-white font-bold text-sm w-16">
                ID
              </TableHead>
              <TableHead scope="col" className="text-white font-bold text-sm">
                Title
              </TableHead>
              <TableHead scope="col" className="text-white font-bold text-sm">
                <div className="flex items-center justify-end gap-3">
                  <span>Completed</span>
                  <button aria-label="Add todo" disabled={loading || !storageReady} onClick={openAddDialog} className="disabled:opacity-50 bg-blue-600 hover:bg-blue-700 text-white size-8 rounded-lg flex items-center justify-center transition cursor-pointer">
                    <Plus className="size-4" />
                  </button>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {todos.slice(Math.max(0, currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((todo) => (
              <TableRow key={todo.id} className="hover:bg-gray-50 border-b border-gray-100">
                <TableCell className="w-16">
                  <span className="inline-flex items-center justify-center bg-zinc-600 text-white rounded-md size-6 text-xs font-bold">
                    {todo.id}
                  </span>
                </TableCell>
                <TableCell className="text-black font-normal text-sm">
                  <button className="text-left hover:underline cursor-pointer break-words" aria-label={`Edit todo ${todo.id}`} onClick={() => editTodo(todo)}>{todo.title}</button>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    {todo.completed ? (
                      <Badge className="bg-green-700 text-white rounded-md px-2 py-1">done ✓</Badge>
                    ) : (
                      <button aria-label={`Mark todo ${todo.id} done`} onClick={() => makeDone(todo.id)} className="cursor-pointer">
                        <Badge className="bg-amber-400 text-black rounded-lg px-2.5 py-1 text-sm gap-1.5 [&>svg]:text-black [&>svg]:size-4" suffixIcon={<ClockThree />}>waiting</Badge>
                      </button>
                    )}
                    <button
                      aria-label={`Delete todo ${todo.id}`}
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white size-8 rounded-lg flex items-center justify-center transition cursor-pointer"
                    >
                      <Trash1 className="size-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {todos.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-8">{loading ? 'Loading...' : 'No todos'}</TableCell></TableRow>}
          </TableBody>
        </TableRoot>
      </div>

      {/* pagination */}
      <div className="mt-3 flex items-center gap-2">
        <button className="border rounded-lg px-3 py-2 disabled:opacity-40" disabled={currentPage <= 1} onClick={() => handlePageChange(1)}>First</button>
        {totalPages > 0 ? (
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} sideLayout="label" />
        ) : <span className="flex-1 text-center">0 / 0</span>}
        <button className="border rounded-lg px-3 py-2 disabled:opacity-40" disabled={currentPage === 0 || currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>Last</button>
      </div>

      {/* add / edit dialog */}
      <ModalOverlay isOpen={showDialog} onOpenChange={setShowDialog} isDismissable className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
        <Modal className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
          <Dialog className="outline-none">
            <Heading slot="title" className="text-xl font-bold mb-4">{editId === null ? 'Add Todo' : 'Edit Todo'}</Heading>
            <form onSubmit={(event) => { event.preventDefault(); addTodo(); }}>
              <label htmlFor="todo-title" className="block mb-2">Title</label>
              <input id="todo-title" autoFocus required maxLength={500} value={title} onChange={(event) => setTitle(event.target.value)} className="border border-gray-300 rounded-lg w-full p-3" />
              <div className="flex justify-end gap-2 mt-5">
                <button type="button" onClick={() => setShowDialog(false)} className="border rounded-lg px-4 py-2">Cancel</button>
                <button type="submit" disabled={!title.trim()} className="bg-blue-600 text-white rounded-lg px-4 py-2 disabled:opacity-40">{editId === null ? 'Add' : 'Save'}</button>
              </div>
            </form>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </div>
  );
}
