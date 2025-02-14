function Notifications() {
    return (
        <div className="flex flex-row items-center gap-4">
            <svg className="w-6 h-6 text-gray-400" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
    
    {/* Notifications Count */}
    <span className="text-sm font-medium text-gray-600">3</span>
    
    {/* Notifications Bell Icon */}
    <svg className="w-6 h-6 text-gray-600" fill="none" xmlns="http://www.w3.org/2000/svg">
    </svg>
    </div>
    );
}

export default Notifications;