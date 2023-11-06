'use client';

import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/modal';
import { Tooltip } from '@nextui-org/tooltip';
import { CameraIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import React, { useState } from 'react';
import { Background } from '../Game/Background/Background';
import { User, updateBackgroundImage } from '@/actions/user.actions';

const defaultImage = 'https://media.rawg.io/media/screenshots/c71/c718076de2326247d29ea5ed32e67c6c.jpg';

type Props = {
  user?: User;
};
export const ChangeBackground = ({ user }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedBackground, setSelectedBackground] = useState<string | undefined>(user?.backgroundImage); // images[0

  const availableImages = user?.favorites.map((game) => game.background_image) || [];

  const images = [...availableImages, defaultImage];

  const toggleModalVisibility = () => {
    setIsModalVisible((prevState) => !prevState);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await updateBackgroundImage(user?.email as string, selectedBackground as string);
      toggleModalVisibility();
    } catch (error) {
      console.error('Error updating background:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='h-[500px] w-full flex items-center justify-center'>
      <Background src={user?.backgroundImage as string} />
      <>
        <Tooltip
          content='All available images are from games in your collection'
          placement='top'
          showArrow
          color='warning'
        >
          <Button
            onClick={toggleModalVisibility}
            startContent={<CameraIcon />}
            variant='flat'
            color='warning'
            className='z-[40]'
          >
            Change background
          </Button>
        </Tooltip>
        <Modal
          placement='center'
          backdrop='blur'
          isOpen={isModalVisible}
          onOpenChange={toggleModalVisibility}
          scrollBehavior='inside'
          size='5xl'
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className='flex gap-1'>Change your style</ModalHeader>
                <ModalBody className='flex'>
                  <div className='flex flex-wrap gap-4 items-center justify-center'>
                    {images.map((image) => (
                      <div key={image}>
                        <Tooltip content='Click to select' placement='top' showArrow color='danger'>
                          <Image
                            src={image as string}
                            className={
                              selectedBackground === image
                                ? 'border-2 border-yellow-500 cursor-pointer rounded-xl'
                                : 'border-2 border-transparent cursor-pointer rounded-xl'
                            }
                            alt={`bgImage-${image}`}
                            width={310}
                            height={310}
                            onClick={() => setSelectedBackground(image)}
                          />
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color='danger' variant='light' onPress={onClose}>
                    Close
                  </Button>
                  <Button isLoading={isLoading} color='warning' variant='shadow' onPress={onSubmit}>
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
