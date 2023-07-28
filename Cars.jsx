import React from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const Cars = () => {
    const [cars, setCars] = useState([])
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        setCars([...cars, data])
        console.log(data)
        console.log(cars)
    }
    console.log(watch("example"))

    return (
        <div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', justifyContent: 'space-between', height: '450px', width: '300px', margin: 'auto' }}
            >
                <label >Modèle</label>
                <input
                    {...register("model", {
                        required: true, 
                        minLength: {
                            value: 2,
                            message: "Nom trop court"
                        },
                        maxLength: {
                            value: 50,
                            message: "Nom trop long"
                        }
                    }
                    )}
                    type="text"
                />
                {errors.model && errors.model.type === "required" && (
                    <span>Renseignez le modèle</span>
                )}
                {errors.model && errors.model.type === "maxLength" && (
                    <span>Nom trop long</span>
                )}
                {errors.model && errors.model.type === "minLength" && (
                    <span>Nom trop court</span>
                )}
                <label>Km</label>
                <input
                    {...register("km", { 
                        required: true,
                        min: 5,
                        max:3000000
                     })}

                    type="number"
                />
                {errors.km && errors.km.type === "required" && (
                    <span>Renseignez le km</span>
                )}
                {errors.km && errors.km.type === "max" && (
                    <span>Valeur trop grande</span>
                )}
                {errors.km && errors.km.type === "min" && (
                    <span>Valeur trop petite </span>
                )}
                <label>Description</label>
                <textarea name="" id="" cols="30" rows="6"
                    {...register("description")}
                >
                </textarea>
                <label htmlFor="difficulty-names">type d'energie :</label>
                <select name="difficulty-names" id="difficulty-names"
                    {...register("type", { required: true })}
                >
                    <option disabled={true} value="">Choisir :</option>
                    <option value="Diesel">Diesel</option>
                    <option value="Essence">Essence</option>
                    <option value="Electrique">Electrique</option>
                </select>
                {errors.type && <span>Renseignez le type</span>}
                <label >Neuve</label>
                <input type="checkbox"
                    {...register("new")}
                ></input>
                <button type="submit">Valider</button>
            </form>
            {cars.length > 0 &&
                cars.map((el, i) =>
                (
                    <div key={i}>
                        {el.model + " " + el.type + " " + el.km}
                    </div>
                ))
            }
        </div>
    )
}

export default Cars
