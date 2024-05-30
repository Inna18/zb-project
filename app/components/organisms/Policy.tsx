import styles from './organisms.module.css';

import React, { useEffect, useState } from 'react';
import Editor from '../atoms/editor/Editor';
import policySchema from '@/sanity/schemas/shippingPolicy';
import Spinner from '../atoms/spinner/Spinner';
import Button from '../atoms/button/Button';

import { Schema } from '@sanity/schema';
import { useShippingPolicyStore } from '@/app/stores/useShippingPolicyStore';
import { useShippingPolicyGet } from '@/app/queries/queryHooks/policy/useShippingPolicyGet';
import { useShippingPolicyCreate } from '@/app/queries/queryHooks/policy/useShippingPolicyCreate';
import { useShippingPolicyUpdate } from '@/app/queries/queryHooks/policy/useShippingPolicyUpdate';
import { deleteShippingPolicy } from '@/app/service/useShippingPolicyApi';
import { useQueryClient } from '@tanstack/react-query';
import { toHTML } from '@portabletext/to-html';
import { htmlToBlocks } from '@sanity/block-tools';
import { useModalStore } from '@/app/stores/useModalStore';
import { modalMsgConstants } from '@/app/constants/modalMsg';
import { useModal } from '@/app/hooks/useModal';
import Modal from '../atoms/modal/Modal';

const { POLICY_UPDATE_SUCCESS } = modalMsgConstants;

interface PolicyProps {
  rerender: (menu: string) => void;
}
const Policy = ({ rerender }: PolicyProps) => {
  const { shippingPolicy, updatePolicy } = useShippingPolicyStore(
    (state) => state
  );
  const { modal, setModal } = useModalStore((state) => state);
  const { open, close, isOpen } = useModal();
  const queryClient = useQueryClient();
  const { mutate: mutateUpdate } = useShippingPolicyUpdate();

  const handleContentChange = (contentDescription: string) => {
    contentDescription = '<html>' + contentDescription + '</html>';
    const schema = Schema.compile({
      name: 'schema',
      types: [policySchema],
    });
    const blockContentType = schema
      .get('shippingPolicy')
      .fields.find((field: any) => field.name === 'content').type;
    const blocks = htmlToBlocks(contentDescription, blockContentType);
    updatePolicy({ ...shippingPolicy, content: blocks });
  };

  const returnToList = () => {
    close();
    rerender('list');
  };

  const handleSave = () => {
    mutateUpdate(shippingPolicy, {
      onSuccess: () => {
        queryClient.setQueryData(['policy'], () => ({ ...shippingPolicy }));
        setModal({
          type: 'alert',
          content: POLICY_UPDATE_SUCCESS,
          onClose: returnToList,
        });
        open();
      },
    });
  };

  return (
    <>
      {shippingPolicy && (
        <div className={styles['policy-section']}>
          <div className={styles['editor-l']}>
            <Editor
              content={toHTML(shippingPolicy.content)}
              onChange={(newContent: string) => handleContentChange(newContent)}
            />
          </div>
          <Button value='Save' onClick={handleSave} />
        </div>
      )}
      <Modal
        selector={'portal'}
        show={isOpen}
        type={modal.type}
        content={modal.content}
        onClose={modal.onClose}
      />
      {/* <button onClick={deleteShippingPolicy}>Delete</button> delete after tests */}
    </>
  );
};

export default Policy;
