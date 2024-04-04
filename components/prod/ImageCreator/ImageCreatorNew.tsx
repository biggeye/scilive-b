import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  InputGroup,
  Alert,
  Button,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useAuth } from '@saas-ui/auth';
import { useUserProfile } from '@/lib/user/useUserProfile';
import { selectedModelIdState } from '@/state/replicate/config-atoms';
import {  globalLoadingState} from '@/state/replicate/prediction-atoms';
import { useImageCreateSubmit } from '@/lib/dashboard/submit/replicate/useImageCreateSubmit';
import { PredictionInstanceState } from '@/types';
import { predictionInstanceState } from '@/state/replicate/prediction-atoms';

const ImageCreatorNew = () => {
// React Hooks
const [userInput, setUserInput] = useState<string>('');
const [formData, setFormData] = useState([]);

// Recoil Hooks
const setNewPrediction = useSetRecoilState<PredictionInstanceState>(predictionInstanceState);
const modelId = useRecoilValue(selectedModelIdState);
const setGlobalLoading = useSetRecoilState(globalLoadingState);

// Custom Hooks or Functions
const toast = useToast();
const auth = useAuth();
const { profileLoading, profileError } = useUserProfile();
const imageCreateSubmit = useImageCreateSubmit();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setGlobalLoading(true);
    if (!modelId) {
      console.error('No model selected');
      setGlobalLoading(false);
      return;
    }
    const prediction_id = await imageCreateSubmit(userInput);
    if (prediction_id) {
      toast({
        title: 'Processing',
        description: `Your image is now processing (ID: ${prediction_id}). You will be notified upon completion.`,
        status: 'info',
        duration: 9000,
        isClosable: true,
      });
      setNewPrediction(prediction_id)
    }
  };

    useEffect(() => {
      // Fetch data from Supabase
      const fetchData = async () => {
        try {
          const { data, error } = await supabase.from('models.master').select('*').eq('parent_model_id', modelId); 
            if (error) {
            throw error;
          }
          setFormData(data);
        } catch (error) {
          console.error('Error fetching data:' error);
        }
      };
      fetchData();
    }, []);
  
    return (
      <form>
        {formData.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.variable}>{field.description}</label>
            {field.is_required ? <span>*</span> : null}
            <input
              type={field.validation_rules}
              name={field.variable}
              defaultValue={field.default_value}
              required={field.is_required}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    );
  };
  

};

export default ImageCreatorNew;
