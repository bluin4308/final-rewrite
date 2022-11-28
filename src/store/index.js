import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      clothes: [],
      cleanClothes: () => {
        set({ clothes: [] });
      },

      // addCloth добавление вещи/нового размера из модалки
      addCloth: ({ id, type, price, title }) => {
        // если ID есть в массиве clothes
        const index = get().clothes.findIndex((item) => item.id === id);
        if (index >= 0) {
          const currentClothObject = { ...get().clothes[index] };
          const price = parseInt(currentClothObject.price);
          const amount = parseInt(currentClothObject.amount);
          const newAmount = price + amount;
          currentClothObject.amount = parseInt(newAmount.toFixed(2));

          switch (type) {
            case "s":
              !!currentClothObject.quantityS
                ? currentClothObject.quantityS++
                : (currentClothObject.quantityS = 1);
              break;
            case "m":
              !!currentClothObject.quantityM
                ? currentClothObject.quantityM++
                : (currentClothObject.quantityM = 1);
              break;
            case "l":
              !!currentClothObject.quantityL
                ? currentClothObject.quantityL++
                : (currentClothObject.quantityL = 1);
              break;
            default:
              break;
          }
          set((state) => {
            const currentClothesArray = [...state.clothes];
            currentClothesArray[index] = currentClothObject;
            return { clothes: currentClothesArray };
          });
        }
        // если ID в массиве нет
        else {
          const newClothObject = {
            id: id,
          };
          newClothObject.price = price;
          newClothObject.amount = 0;
          newClothObject.amount += price;
          newClothObject.title = title;

          switch (type) {
            case "s":
              newClothObject.quantityS = 1;
              break;
            case "m":
              newClothObject.quantityM = 1;
              break;
            case "l":
              newClothObject.quantityL = 1;
              break;
            default:
              break;
          }
          set((state) => {
            const currentClothesArray = [...state.clothes];
            currentClothesArray.push(newClothObject);
            return { clothes: currentClothesArray };
          });
        }
      },

      // deleteCloth удаление вещи целиком (Cart)
      deleteCloth: ({ id }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray.splice(index, 1);
          return { clothes: currentClothesArray };
        });
      },

      addSize: ({ id, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };
        const price = parseInt(currentClothObject.price);
        const amount = parseInt(currentClothObject.amount);
        const newAmount = price + amount;
        currentClothObject.amount = parseInt(newAmount.toFixed(2));
        if (type === "s") {
          !!currentClothObject.quantityS
            ? currentClothObject.quantityS++
            : (currentClothObject.quantityS = 1);
        }
        if (type === "m") {
          !!currentClothObject.quantityM
            ? currentClothObject.quantityM++
            : (currentClothObject.quantityM = 1);
        }
        if (type === "l") {
          !!currentClothObject.quantityL
            ? currentClothObject.quantityL++
            : (currentClothObject.quantityL = 1);
        }
        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray[index] = currentClothObject;
          return { clothes: currentClothesArray };
        });
      },

      deleteSize: ({ id, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };
        const price = parseInt(currentClothObject.price);
        const amount = parseInt(currentClothObject.amount);
        const newAmount = amount - price;
        currentClothObject.amount = parseInt(newAmount.toFixed(2));

        switch (type) {
          case "s":
            !!currentClothObject.quantityS
              ? currentClothObject.quantityS--
              : (currentClothObject.quantityS = 0);
            break;

          case "m":
            !!currentClothObject.quantityM
              ? currentClothObject.quantityM--
              : (currentClothObject.quantityM = 0);
            break;

          case "l":
            !!currentClothObject.quantityL
              ? currentClothObject.quantityL--
              : (currentClothObject.quantityL = 0);
            break;
        }
        set((state) => {
          const currentClothesArray = [...state.clothes];
          currentClothesArray[index] = currentClothObject;
          return { clothes: currentClothesArray };
        });
      },
    }),
    {
      name: "clothes",
    }
  )
);

export const useTitle = create((set) => ({
  title: "",
  setTitle: (title) => {
    set({ title: title });
  },
}));

export default useStore;
