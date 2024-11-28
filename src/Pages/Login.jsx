import { CSSTransition } from 'react-transition-group';
import { SignInForm } from '../Components/UI/SignInForm';
import { SignUpForm } from '../Components/UI/SignUpForm';
import { SignUpFormEm } from '../Components/UI/SignUpFormEm';
import { useLogin } from '../Components/hooks/useLogin';
import { useRef } from 'react';

export default function Login() {
    const { showSignIn, showSignUp, toggleForm, initialLoad } = useLogin();

    const signInRef = useRef(null);
    const signUpRef = useRef(null);
    const signUpEmRef = useRef(null);

    return (
        <div className="relative bg-gray-200 min-h-screen flex items-center justify-center p-4 overflow-hidden">
            <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto max-h-[90vh] flex overflow-hidden">
                
                <CSSTransition
                    in={!initialLoad && showSignIn}
                    timeout={600}
                    classNames="slide-left"
                    unmountOnExit
                    nodeRef={signInRef}
                >
                    <div ref={signInRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <SignInForm onToggleForm={toggleForm} />
                    </div>
                </CSSTransition>
    
                <CSSTransition
                    in={!initialLoad && showSignUp}
                    timeout={600}
                    classNames="slide-right"
                    unmountOnExit
                    nodeRef={signUpRef} 
                >
                    <div ref={signUpRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <SignUpForm onToggleForm={toggleForm} />
                    </div>
                </CSSTransition>

                <CSSTransition
                    in={!initialLoad && !showSignIn && !showSignUp}
                    timeout={600}
                    classNames="slide-right"
                    unmountOnExit
                    nodeRef={signUpEmRef} 
                >
                    <div ref={signUpEmRef} className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <SignUpFormEm onToggleForm={toggleForm} />
                    </div>
                </CSSTransition>
            </div>
        </div>
    );
}
