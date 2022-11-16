import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set, get) => ({
      clothes: [],

      // addCloth добавление вещи/нового размера из модалки
      addCloth: ({ id, type }) => {
        // если ID есть в массиве clothes
        const index = get().clothes.findIndex((item) => item.id === id);
        if (index >= 0) {
          const currentClothObject = { ...get().clothes[index] };

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
      // changeSize изменить размер (Cart)
      changeSize: ({ id, action, type }) => {
        const index = get().clothes.findIndex((item) => item.id === id);
        const currentClothObject = { ...get().clothes[index] };

        if (action === "+" && type === "s") {
          !!currentClothObject.quantityS
            ? currentClothObject.quantityS++
            : (currentClothObject.quantityS = 1);
        }

        if (action === "+" && type === "m") {
          !!currentClothObject.quantityM
            ? currentClothObject.quantityM++
            : (currentClothObject.quantityM = 1);
        }

        if (action === "+" && type === "l") {
          !!currentClothObject.quantityL
            ? currentClothObject.quantityL++
            : (currentClothObject.quantityL = 1);
        }

        if (action === "-" && type === "s") {
          !!currentClothObject.quantityS
            ? currentClothObject.quantityS--
            : (currentClothObject.quantityS = 0);
        }

        if (action === "-" && type === "m") {
          !!currentClothObject.quantityM
            ? currentClothObject.quantityM--
            : (currentClothObject.quantityM = 0);
        }

        if (action === "-" && type === "l") {
          !!currentClothObject.quantityL
            ? currentClothObject.quantityL--
            : (currentClothObject.quantityL = 0);
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
