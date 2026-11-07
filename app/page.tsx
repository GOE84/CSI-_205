import Image from 'next/image';
import { Badge } from "@/components/tailgrids/core/badge";
import { Check, CheckCircle1, InfoCircle } from "@tailgrids/icons";

export default function HomePage() {
  return (<>
    <section className="mx-auto my-6 max-w-3xl rounded-lg border border-gray-300 p-4 flex flex-col sm:flex-row gap-5">
      <div className="sm:w-1/3 shrink-0">
        <Image src="/images/phoom.jpg" alt="ภูมิ เดชอวยพรวงศ์" width={260} height={320} className="w-full max-w-64 mx-auto rounded-lg" />
        <p className="mt-2 font-semibold">68051254 ภูมิ เดชอวยพรวงศ์</p>
        <p className="text-sm">CSI205 Front-End Software Development</p>
      </div>
      <div>
        <h1 className="font-bold text-xl mb-3">CSI205 Front-End Software Development</h1>
        <p className="mb-3">แบบฝึกหัดการพัฒนาโปรแกรมส่วนหน้า ด้วย Next.js และ Tailwind CSS</p>
        <ul className="list-disc pl-5 space-y-3">
          <li> <Badge color="success" className="text-base">Calculator</Badge> เครื่องคิดเลขจากแบบฝึกหัด FSM</li>
          <li> <Badge color="warning" className="text-base">Animation</Badge> การเคลื่อนที่และสะท้อนขอบด้วย React State และ Effect</li>
          <li> <Badge color="rose" className="text-base">Todos</Badge> เพิ่ม แก้ไข ลบ กรอง แบ่งหน้า และบันทึกข้อมูลลง Local Storage</li>
          <li> <Badge color="blue" className="text-base">Products & Carts</Badge> ระบบรายการสินค้าและตะกร้าสินค้าด้วย React Context</li>
          <li> <Badge color="purple" className="text-base">Login & Logout</Badge> ระบบตรวจสอบสิทธิ์ผู้ใช้งาน (Authentication)</li>
        </ul>
      </div>
    </section>

    <section className="mx-auto my-6 max-w-3xl rounded-lg border border-gray-300 p-4 flex flex-col sm:flex-row gap-5">
      <div className='text-base'>
        <h1 className="font-bold text-xl mb-8">About me</h1>
        <p className="mb-2"> Hello, I’m Phoom. I am currently studying Computer Science at Sripatum University AI, Data Science, Machine Learning, and Deep Learning.</p>
          <ul className="list-disc pl-5 space-y-3 text-sm mt-5 mb-5">
          <li> <strong>Core Expertise:</strong> Machine Learning & Deep Learning architectures, Computer Vision (OpenCV, MediaPipe), Time-Series Forecasting (ARIMA, LSTM), and NLP.</li>
          <li><strong>Currently working on:</strong> Local LLM optimization (Qwen, Gemma, Ollama) and testing model performance across hybrid environments</li>
          <li><strong>Learning & Exploring:</strong> Quantitative Finance, Algorithmic Trading, and advanced Deep Learning applications. Fun fact: When I'm not training models, I'm probably analyzing market trends or exploring dropshipping data</li>
        </ul>
        <p className="mb-1"> Computer Science and Software Development</p>
        <p className="mb-1"> Sripatum University</p>
      </div>

    </section>
    </>
  );
}
