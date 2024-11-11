import Header from "@/components/Header";
import Todo from "@/components/Todo";

export default function Home() {
  return (
    <div className='flex flex-col bg-teal-700 h-dvh w-dvw m-auto justify-center'>
      <Header />
      <Todo />
    </div>
  );
}
