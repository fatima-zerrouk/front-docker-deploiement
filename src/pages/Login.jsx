import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from '../hooks/useFetch';
import { Field } from '../components/ui/Field.jsx';
import { ButtonTerracota } from '../components/ui/Buttons.jsx';
import { LiaEyeSolid, LiaEyeSlashSolid } from 'react-icons/lia';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const { apiFetch } = useFetch();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const handleSubmitForm = async formData => {
    try {
      // appelle l'API qui renvoie soit les données, soit { validationErrors })
      const result = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      // si erreur validation
      if (result?.validationErrors) {
        result.validationErrors.forEach(({ path, msg }) => {
          // mets l'erreur au bon champ sous l'email ou mdp
          setError(path, { message: msg });
        });
        return; // arrête la fonction ici
      }

      //si succès
      login(result.token); //passe le token reçu dans data
      navigate('/dashboard');
    } catch (error) {
      // si l'erreur vient des identifiants erreur 401 du back
      if (error.message === 'Identifiants incorrects') {
        setAuthError(error.message);
      } else {
        toast.error(error.message); //toats global
      }
    }
  };

  return (
    <section className="px-(--margin-mobile) py-26 bg-cream flex justify-center">
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="rounded-(--radius-card) shadow-card w-100 bg-white p-8 lg:w-110 h-auto transition-all duration-300 ease-in-out"
      >
        <h1 className="title-h1 text-center font-semibold">Connexion</h1>

        <fieldset className="grid grid-cols-1 mt-6">
          <label htmlFor="email" className="font-medium">
            Email
          </label>
          <Field
            type="text"
            placeholder="Entrer votre mail"
            id="email"
            className="mb-2 mt-2 "
            {...register('email', {
              required: "L'email est obligatoire.",
            })}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}

          <label htmlFor="psw" className="font-medium mt-8">
            Mot de passe
          </label>
          <div className="relative">
            <Field
              type={showPassword ? 'text' : 'password'}
              placeholder="Entrer votre mot de passe"
              id="psw"
              className="mb-2 mt-2 w-full"
              {...register('password', {
                required: 'Le mot de passe est obligatoire.',
              })}
            />
            {errors.password && (
              <p className="text-red-700">{errors.password.message}</p>
            )}

            <div
              className="absolute  top-5 left-70 lg:left-84"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? (
                <LiaEyeSolid
                  className="text-2xl "
                  aria-label="Icone d'un oeil ouvert pour afficher le mot de passe "
                />
              ) : (
                <LiaEyeSlashSolid
                  className="text-2xl"
                  aria-label="Icone d'un oeil fermer pour ne plus afficher le mot de passe "
                />
              )}
            </div>
          </div>
          <ButtonTerracota
            type="submit"
            value={'Se connecter'}
            className=" w-full lg:w-full mt-8"
          />
          {authError && (
            <p className=" mt-4 sm text-center font-medium text-red-700">
              {authError}
            </p>
          )}
        </fieldset>
      </form>
    </section>
  );
}
