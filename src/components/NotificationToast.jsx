import React, { useEffect } from "react";
import { useNotificationContext } from "../context/NotificationContext";

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <div>
      {notifications
        .slice(0)
        .reverse()
        .map((notification) => (
          <div
            key={notification.id}
            className={`bg-white-300 m-2 gap-3 items-center border p-4 rounded-md shadow-md flex justify-between items-center${
              notification.type === "success"
                ? "bg-neutral-50 text-black"
                : "bg-red-500 text-white"
            }`}
          >
            <svg class="h-6 w-6 fill-current" viewBox="0 0 448 512">
              <path d="M256 32V49.88C328.5 61.39 384 124.2 384 200V233.4C384 278.8 399.5 322.9 427.8 358.4L442.7 377C448.5 384.2 449.6 394.1 445.6 402.4C441.6 410.7 433.2 416 424 416H24C14.77 416 6.365 410.7 2.369 402.4C-1.628 394.1-.504 384.2 5.26 377L20.17 358.4C48.54 322.9 64 278.8 64 233.4V200C64 124.2 119.5 61.39 192 49.88V32C192 14.33 206.3 0 224 0C241.7 0 256 14.33 256 32V32zM216 96C158.6 96 112 142.6 112 200V233.4C112 281.3 98.12 328 72.31 368H375.7C349.9 328 336 281.3 336 233.4V200C336 142.6 289.4 96 232 96H216zM288 448C288 464.1 281.3 481.3 269.3 493.3C257.3 505.3 240.1 512 224 512C207 512 190.7 505.3 178.7 493.3C166.7 481.3 160 464.1 160 448H288z" />
            </svg>
            <div class="ml-3 font-sans text-xs leading-6 text-blue-600">
              <p>{notification.message}</p>
            </div>
            <button
              type="button"
              onClick={() => removeNotification(notification.id)}
              class="ml-auto inline-flex h-5 w-5 rounded-full border border-blue-600 p-0.5 text-blue-600"
              aria-label="Close"
            >
              <svg
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>
          </div>
        ))}
    </div>
  );
};

export default NotificationToast;
