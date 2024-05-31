import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Select } from '../select';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	updateSettings: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	updateSettings,
}: ArticleParamsFormProps) => {
	const [modalState, setModalState] = useState(false);
	const [articleSettings, setArticleSettings] =
		useState<ArticleStateType>(defaultArticleState);
	const asideRef = useRef<HTMLDivElement | null>(null);

	const openModal = () => {
		setModalState(!modalState);
	};

	useOutsideClickClose({
		isOpen: modalState,
		onChange: setModalState,
		rootRef: asideRef,
		onClose: () => setModalState(false),
	});

	const handleInputChange =
		(optionType: keyof ArticleStateType) => (selected: OptionType) => {
			setArticleSettings((prevState) => ({
				...prevState,
				[optionType]: selected,
			}));
		};

	const handleResetChange = () => {
		setArticleSettings(defaultArticleState);
		updateSettings(defaultArticleState);
	};

	const handleSubmitChange = (evt: React.FormEvent) => {
		evt.preventDefault();
		updateSettings(articleSettings);
	};

	return (
		<>
			<div ref={asideRef}>
				<ArrowButton onClick={openModal} modalState={modalState} />
				<aside
					className={clsx(
						styles.container,
						modalState && styles.container_open
					)}>
					<form className={styles.form} onSubmit={handleSubmitChange}>
						<Text as='h2' size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							title='Шрифт'
							selected={articleSettings.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={handleInputChange('fontFamilyOption')}></Select>
						<RadioGroup
							name={'fontSize'}
							options={fontSizeOptions}
							selected={articleSettings.fontSizeOption}
							title={'Размер шрифта'}
							onChange={handleInputChange('fontSizeOption')}></RadioGroup>
						<Select
							title='Цвет шрифта'
							selected={articleSettings.fontColor}
							options={fontColors}
							onChange={handleInputChange('fontColor')}></Select>
						<Separator></Separator>
						<Select
							title='Цвет фона'
							selected={articleSettings.backgroundColor}
							options={backgroundColors}
							onChange={handleInputChange('backgroundColor')}></Select>
						<Select
							title='Ширина контента'
							selected={articleSettings.contentWidth}
							options={contentWidthArr}
							onChange={handleInputChange('contentWidth')}></Select>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={handleResetChange}
							/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
