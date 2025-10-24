import { ListTodo } from 'lucide-react';

export function TasksPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-center justify-center gap-3 mb-8">
                <ListTodo className="w-8 h-8 text-green-600" />
                <h1 className="text-3xl font-bold">Список задач</h1>
            </div>

            <div className="bg-white rounded-lg shadow p-8">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                        <ListTodo className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 text-lg">Здесь будет список ваших задач</p>
                        <p className="text-gray-500 text-sm mt-2">Не забывайте о важных работах в саду</p>
                    </div>
                </div>
            </div>
        </div>
    );
}