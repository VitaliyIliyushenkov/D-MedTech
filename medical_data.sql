PGDMP      %            
    |            medical_data    17.0    17.0     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    16396    medical_data    DATABASE     �   CREATE DATABASE medical_data WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE medical_data;
                     postgres    false            �            1259    16511 	   diagnosis    TABLE     �  CREATE TABLE public.diagnosis (
    id integer NOT NULL,
    name text NOT NULL,
    age_category text,
    complaints text NOT NULL,
    disease_history text NOT NULL,
    objective_status text NOT NULL,
    recommendations text[],
    CONSTRAINT diagnosis_new_age_category_check CHECK ((age_category = ANY (ARRAY['младше 18'::text, '18-35'::text, '36-60'::text, 'старше 60'::text])))
);
    DROP TABLE public.diagnosis;
       public         heap r       postgres    false            �            1259    16510    diagnosis_new_id_seq    SEQUENCE     �   CREATE SEQUENCE public.diagnosis_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.diagnosis_new_id_seq;
       public               postgres    false    222            �           0    0    diagnosis_new_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.diagnosis_new_id_seq OWNED BY public.diagnosis.id;
          public               postgres    false    221            �            1259    16479    patient_visits    TABLE       CREATE TABLE public.patient_visits (
    id integer NOT NULL,
    patient_id integer NOT NULL,
    visit_date timestamp without time zone DEFAULT now(),
    age_category text,
    complaints text NOT NULL,
    disease_history text NOT NULL,
    objective_status text NOT NULL,
    notes text,
    diagnosis_id bigint,
    recommendations text,
    CONSTRAINT patient_visits_new_age_category_check CHECK ((age_category = ANY (ARRAY['младше 18'::text, '18-35'::text, '36-60'::text, 'старше 60'::text])))
);
 "   DROP TABLE public.patient_visits;
       public         heap r       postgres    false            �            1259    16478    patient_visits_new_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patient_visits_new_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE public.patient_visits_new_id_seq;
       public               postgres    false    220            �           0    0    patient_visits_new_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.patient_visits_new_id_seq OWNED BY public.patient_visits.id;
          public               postgres    false    219            �            1259    16442    patients    TABLE     �   CREATE TABLE public.patients (
    id integer NOT NULL,
    full_name text NOT NULL,
    birth_date date NOT NULL,
    phone_number character varying(15),
    address text
);
    DROP TABLE public.patients;
       public         heap r       postgres    false            �            1259    16441    patients_id_seq    SEQUENCE     �   CREATE SEQUENCE public.patients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.patients_id_seq;
       public               postgres    false    218            �           0    0    patients_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.patients_id_seq OWNED BY public.patients.id;
          public               postgres    false    217            .           2604    16514    diagnosis id    DEFAULT     p   ALTER TABLE ONLY public.diagnosis ALTER COLUMN id SET DEFAULT nextval('public.diagnosis_new_id_seq'::regclass);
 ;   ALTER TABLE public.diagnosis ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            ,           2604    16482    patient_visits id    DEFAULT     z   ALTER TABLE ONLY public.patient_visits ALTER COLUMN id SET DEFAULT nextval('public.patient_visits_new_id_seq'::regclass);
 @   ALTER TABLE public.patient_visits ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            +           2604    16445    patients id    DEFAULT     j   ALTER TABLE ONLY public.patients ALTER COLUMN id SET DEFAULT nextval('public.patients_id_seq'::regclass);
 :   ALTER TABLE public.patients ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16511 	   diagnosis 
   TABLE DATA           {   COPY public.diagnosis (id, name, age_category, complaints, disease_history, objective_status, recommendations) FROM stdin;
    public               postgres    false    222   �$       �          0    16479    patient_visits 
   TABLE DATA           �   COPY public.patient_visits (id, patient_id, visit_date, age_category, complaints, disease_history, objective_status, notes, diagnosis_id, recommendations) FROM stdin;
    public               postgres    false    220   @-       �          0    16442    patients 
   TABLE DATA           T   COPY public.patients (id, full_name, birth_date, phone_number, address) FROM stdin;
    public               postgres    false    218   ]-       �           0    0    diagnosis_new_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.diagnosis_new_id_seq', 1, false);
          public               postgres    false    221            �           0    0    patient_visits_new_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.patient_visits_new_id_seq', 32, true);
          public               postgres    false    219            �           0    0    patients_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.patients_id_seq', 14, true);
          public               postgres    false    217            9           2606    16519    diagnosis diagnosis_new_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.diagnosis
    ADD CONSTRAINT diagnosis_new_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.diagnosis DROP CONSTRAINT diagnosis_new_pkey;
       public                 postgres    false    222            7           2606    16488 &   patient_visits patient_visits_new_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.patient_visits
    ADD CONSTRAINT patient_visits_new_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.patient_visits DROP CONSTRAINT patient_visits_new_pkey;
       public                 postgres    false    220            2           2606    16451 *   patients patients_full_name_birth_date_key 
   CONSTRAINT     v   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_full_name_birth_date_key UNIQUE (full_name, birth_date);
 T   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_full_name_birth_date_key;
       public                 postgres    false    218    218            4           2606    16449    patients patients_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.patients
    ADD CONSTRAINT patients_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.patients DROP CONSTRAINT patients_pkey;
       public                 postgres    false    218            5           1259    16780 $   patient_visits_diagnosis_id_99e5cea3    INDEX     g   CREATE INDEX patient_visits_diagnosis_id_99e5cea3 ON public.patient_visits USING btree (diagnosis_id);
 8   DROP INDEX public.patient_visits_diagnosis_id_99e5cea3;
       public                 postgres    false    220            :           2606    16775 C   patient_visits patient_visits_diagnosis_id_99e5cea3_fk_diagnosis_id    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient_visits
    ADD CONSTRAINT patient_visits_diagnosis_id_99e5cea3_fk_diagnosis_id FOREIGN KEY (diagnosis_id) REFERENCES public.diagnosis(id) DEFERRABLE INITIALLY DEFERRED;
 m   ALTER TABLE ONLY public.patient_visits DROP CONSTRAINT patient_visits_diagnosis_id_99e5cea3_fk_diagnosis_id;
       public               postgres    false    222    220    4665            ;           2606    16489 1   patient_visits patient_visits_new_patient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient_visits
    ADD CONSTRAINT patient_visits_new_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patients(id) ON DELETE CASCADE;
 [   ALTER TABLE ONLY public.patient_visits DROP CONSTRAINT patient_visits_new_patient_id_fkey;
       public               postgres    false    4660    218    220            �   a  x��[�nI]�(y��4������H��"K��8��x�lF�Lf��fvm����|A�͹�V7��6`��MCWխ{�ϮΦl/,ۦ	��^؆���6R�M�۶����JX?|���g�mY?�����S�`NO�V�#�q��1���׊�N˄g����2�RyY�Fh�v�6�l�[��+�^I��cPM��N��l	�.u�={�/���/-�¬�d�y^�e7Vo�V��醭��V�/��.r��M�;��F^a�#;���9D�x�غ��k{�.eG'�G3��{듖0���x�\�+�B�9 m#�l�~X�R1t(�|�ࢍx��a1#3;F&Q��n�T��F��T�+�t�C#�B|u0�1�e�8*�U�E6Nl �
 D!�,�i�R0Ź=� *o��7�i���0k�"7@��DR>����~z��F�% ��<0:y�W�THX���5�0��]��L�C���*�mБY�xt�ӽ\d�U���k/�5�P@ �52��U˲b �j�Ax�*����5�0e����xI38��r�qf�Lh��yٔs�e�5߅���BA�����8o٤�@,��<�	%?r�f$2(��w���z�����t�(�&���ب��I�N'&ӝ@.u���wj��4�e:x�r�t>�]ӈ/�r;n0ઝ������T~WvS�����%���� /ӏe
Ǚ93��aa�2�߱�-�P�4�{.��D/|ǰ/#��uV.����3���6�H��$�Z����+��ua�H,^����Ai��%�ev�`�����"�,��0 P�=5dsd�;��OG�0{ ��E���ޤ�r1�x������N�N���ȼԛ���L!/L�N	3��9=~�K�S�j2�a�H!��"Oԋ��<&�d��	���s�A�΂��{�f�I�]6�J���ߢ���{Ý�(WG�sQ>sx<bD�ֿ1Ḥc�o"��:�\]�;�`�8O�pF'���_`ν���:����� ����t$h,P}�ZlT��r�;�W0¢��I���+[ʵ�]U`��Dl9�� �Y�dM�9ӝ�M���oÜ��R�����[��uʷL�9?�N6�2����uj��=9�!��u�P�w�]s��U0˧�.�v��-�#5�WT/�Y�O��9㩊(1�E�~�9���W�}K�ծ!�$���0��Ě�_6�.���
�8��7��LbrX�W@��F�S�~�A���U�M|�{���LƥnczcK��]�vW��_E�e��&��C�l1���7j��\{<71�e����X���x ���yЋ!�s���Q�5�	|q��)����j�D�,b𵦸@Yk��F��Oc�o�/Զ�n�}��i}���@�~����~0~_������$f�[\~rQ(\�\��[��R*�L�6Hk�.�A��Ǖ����|&+/��roì|#c4��h�Hk�kb���-SM�9К��j�q�tD��h}��5�y�Q_r�({�2R>/�>is�8��[e/�#Qt��yk+ҁ^����Dx%+�P�#�7mj����.7��J��M�W�����LxtVH�Ƌ�Pk�c����x��wbbRug~mmF���ߑ�[}��R�Y�Z)/��Fx��4����C��^����#]Ψ'[�"���'$qk���-�>r�> �:�C��lVv�V6�U�����q��Xx����:hI���Y!��gY	Rآ�/�+d��rξ��P &P�#�O�9�Z���YxчӴ2��w�&�  ��K{��1�6n��CĞ������1�6g!�=p��_��1A�ṭ���p�:��*m䙺.���)x
^���.�5�,UW��\�~�\��m�"\��֮=�Y88G��4LN;�-E޿s�e��0p��mEz�D�	����Eϛn�=i;��&<.T���h9�ɠ�첏B��T��ܻ�[~l2�a'Dm�����(;VQ��
���j�g0U	��!�oM�.3���q6��F��u(|< uA�
Z���J��� �ޔ^�+���+��ɳ��$���x������yQ�Ԛ�����-W�X"��`J��O&-��pzXQ�lN+ޝ�^�9��Y�����{{{���      �      x������ � �      �   �   x���M
�@F�3���v�I�0��HEDčW(��ji���FF=��H����\��,�	��ZR�襔B*�b�d��U�9��,�2N�<���
�#��у��_F:G�/��u̖�� G�il����pVg������v�=�q����s������~`     