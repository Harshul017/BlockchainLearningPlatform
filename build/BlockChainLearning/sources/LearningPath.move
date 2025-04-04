module MyModule::LearningPath {

    use aptos_framework::signer;

    /// Struct representing a personalized learning path.
    struct LearningPath has store, key {
        progress: u64,  // Progress percentage (0-100)
        goal: u64,      // Completion goal (always 100 for full completion)
    }

    /// Function to create a new personalized learning path.
    public entry fun create_learning_path(user: &signer) {
        let path = LearningPath {
            progress: 0,
            goal: 100,
        };
        move_to(user, path);
    }

    /// Function to update progress on the learning path.
    public entry fun update_progress(user: &signer, increment: u64) acquires LearningPath {
        let path = borrow_global_mut<LearningPath>(signer::address_of(user));

        // Ensure progress does not exceed 100%
        if (path.progress + increment > 100) {
            path.progress = 100;
        } else {
            path.progress = path.progress + increment;
        }
    }
}

