import ReviewForm from "../components/ReviewForm";

export default function ReviewPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Leave a Review
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your experience with Apply Mate to help us improve and help others make informed decisions
          </p>
        </div>

        <ReviewForm />
      </div>
    </div>
  );
}

