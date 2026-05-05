//import hook for global store
import { create } from "zustand";

//set in Zustand updates the state
//query and mode are states from search and filtering
const useSearchStore = create((set) => ({
  query: "",
  mode: "browse",

  setQuery: (query) => set({ query }),
  setMode: (mode) => set({ mode }),
}));

export default useSearchStore;
