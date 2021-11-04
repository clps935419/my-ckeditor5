/**
 * @license Copyright (c) 2003-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module list/liststyleui
 */

import { Plugin } from 'ckeditor5/src/core';
import { addToolbarToDropdown, ButtonView, createDropdown, SplitButtonView } from 'ckeditor5/src/ui';
import bulletedListIcon from '../theme/icons/bulletedlist.svg';
import listStyleCircleIcon from '../theme/icons/liststylecircle.svg';
import listStyleDecimalIcon from '../theme/icons/liststyledecimal.svg';
import listStyleDecimalWithLeadingZeroIcon from '../theme/icons/liststyledecimalleadingzero.svg';
import listStyleDiscIcon from '../theme/icons/liststyledisc.svg';
import listStyleLowerLatinIcon from '../theme/icons/liststylelowerlatin.svg';
import listStyleLowerRomanIcon from '../theme/icons/liststylelowerroman.svg';
import listStyleSquareIcon from '../theme/icons/liststylesquare.svg';
import listStyleUpperLatinIcon from '../theme/icons/liststyleupperlatin.svg';
import listStyleUpperRomanIcon from '../theme/icons/liststyleupperroman.svg';
import numberedListIcon from '../theme/icons/numberedlist.svg';
import personalBlue from '../theme/icons/personal-blue.svg';
import personal from '../theme/icons/personal.svg';
import '../theme/liststyles.css';



/**
 * The list style UI plugin. It introduces the extended `'bulletedList'` and `'numberedList'` toolbar
 * buttons that allow users to change styles of individual lists in the content.
 *
 * **Note**: Buttons introduced by this plugin override implementations from the {@link module:list/listui~ListUI}
 * (because they share the same names).
 *
 * @extends module:core/plugin~Plugin
 */
export default class ListStyleUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'ListStyleUI';
	}

	init() {
		const editor = this.editor;
		console.warn('初始化', editor);
		const editorId = editor.sourceElement.id;

		const t = editor.locale.t;
		const defaultSetArr = [
            {
                label: t('test1'),
                tooltip: t('test1'),
                type: 'test1',
                icon: personal,
            },
            {
                label: t('test2'),
                tooltip: t('test2'),
                type: 'test2',
                icon: personalBlue,
            },
        ];
		console.log(JSON.parse(sessionStorage.getItem(editorId)));

		const currentSetArr = JSON.parse(sessionStorage.getItem(editorId)) || defaultSetArr;
		sessionStorage.setItem(editorId, JSON.stringify(currentSetArr));

		editor.ui.componentFactory.add( 'bulletedList', getSplitButtonCreator( {
			editor,
			parentCommandName: 'bulletedList',
			buttonLabel: t( 'Bulleted List' ),
			buttonIcon: bulletedListIcon,
			toolbarAriaLabel: t( 'Bulleted list styles toolbar' ),
			styleDefinitions: [
				{
					label: t( 'Toggle the disc list style' ),
					tooltip: t( 'Disc' ),
					type: 'disc',
					icon: listStyleDiscIcon
				},
				{
					label: t( 'Toggle the circle list style' ),
					tooltip: t( 'Circle' ),
					type: 'circle',
					icon: listStyleCircleIcon
				},
				{
					label: t( 'Toggle the square list style' ),
					tooltip: t( 'Square' ),
					type: 'square',
					icon: listStyleSquareIcon
				}
			]
		} ) );

		editor.ui.componentFactory.add(
            'numberedList',
            getSplitButtonCreator({
                editor,
                parentCommandName: 'numberedList',
                buttonLabel: t('Numbered List'),
                buttonIcon: numberedListIcon,
                toolbarAriaLabel: t('Numbered list styles toolbar'),
                styleDefinitions: currentSetArr,
            })
        );
	}
}

// A helper that returns a function that creates a split button with a toolbar in the dropdown,
// which in turn contains buttons allowing users to change list styles in the context of the current selection.
//
// @param {Object} options
// @param {module:core/editor/editor~Editor} options.editor
// @param {'bulletedList'|'numberedList'} options.parentCommandName The name of the higher-order editor command associated with
// the set of particular list styles (e.g. "bulletedList" for "disc", "circle", and "square" styles).
// @param {String} options.buttonLabel Label of the main part of the split button.
// @param {String} options.buttonIcon The SVG string of an icon for the main part of the split button.
// @param {String} options.toolbarAriaLabel The ARIA label for the toolbar in the split button dropdown.
// @param {Object} options.styleDefinitions Definitions of the style buttons.
// @returns {Function} A function that can be passed straight into {@link module:ui/componentfactory~ComponentFactory#add}.
function getSplitButtonCreator( { editor, parentCommandName, buttonLabel, buttonIcon, toolbarAriaLabel, styleDefinitions } ) {
	const parentCommand = editor.commands.get( parentCommandName );
	const listStyleCommand = editor.commands.get( 'listStyle' );
	console.log('進1', listStyleCommand);
	// @param {module:utils/locale~Locale} locale
	// @returns {module:ui/dropdown/dropdownview~DropdownView}
	return locale => {
	console.log('進2');

		const dropdownView = createDropdown( locale, SplitButtonView );
		const splitButtonView = dropdownView.buttonView;
		const styleButtonCreator = getStyleButtonCreator( { editor, parentCommandName, listStyleCommand } );
		
		addToolbarToDropdown( dropdownView, styleDefinitions.map( styleButtonCreator ) );

		dropdownView.bind( 'isEnabled' ).to( parentCommand );
		dropdownView.toolbarView.ariaLabel = toolbarAriaLabel;
		dropdownView.class = 'ck-list-styles-dropdown';
		//打開下拉
		dropdownView.on('change:isOpen', (eventInfo, name, value, oldValue) => {
            console.log('ffffffffff', eventInfo, name, value, oldValue);
        });
		
		splitButtonView.on( 'execute', () => {
			console.log('打開----');

			editor.execute( parentCommandName );
			editor.editing.view.focus();
		} );

		splitButtonView.set( {
			label: buttonLabel,
			icon: buttonIcon,
			tooltip: true,
			isToggleable: true
		} );

		splitButtonView.bind( 'isOn' ).to( parentCommand, 'value', value => !!value );
			console.log('測試11', dropdownView);
		
		return dropdownView;
	};
}

// A helper that returns a function (factory) that creates individual buttons used by users to change styles
// of lists.
//
// @param {Object} options
// @param {module:core/editor/editor~Editor} options.editor
// @param {module:list/liststylecommand~ListStylesCommand} options.listStyleCommand The instance of the `ListStylesCommand` class.
// @param {'bulletedList'|'numberedList'} options.parentCommandName The name of the higher-order command associated with a
// particular list style (e.g. "bulletedList" is associated with "square" and "numberedList" is associated with "roman").
// @returns {Function} A function that can be passed straight into {@link module:ui/componentfactory~ComponentFactory#add}.
function getStyleButtonCreator( { editor, listStyleCommand, parentCommandName } ) {
	const locale = editor.locale;
	const parentCommand = editor.commands.get( parentCommandName );
	console.log('進')
	// @param {String} label The label of the style button.
	// @param {String} type The type of the style button (e.g. "roman" or "circle").
	// @param {String} icon The SVG string of an icon of the style button.
	// @param {String} tooltip The tooltip text of the button (shorter than verbose label).
	// @returns {module:ui/button/buttonview~ButtonView}
	return ( { label, type, icon, tooltip } ) => {
		const button = new ButtonView( locale );
            console.log('execute', listStyleCommand);

		button.set( { label, icon, tooltip } );
		listStyleCommand.on( 'change:value', () => {
			button.isOn = listStyleCommand.value === type;
		} );
		

		button.on( 'execute', () => {
			// If the content the selection is anchored to is a list, let's change its style.
			if ( parentCommand.value ) {
				// If the current list style is not set in the model or the style is different than the
				// one to be applied, simply apply the new style.
				if ( listStyleCommand.value !== type ) {
					editor.execute( 'listStyle', { type } );
				}
				// If the style was the same, remove it (the button works as an off toggle).
				else {
					editor.execute( 'listStyle', { type: listStyleCommand._defaultType } );
				}
			}
			// If the content the selection is anchored to is not a list, let's create a list of a desired style.
			else {
				editor.model.change( () => {
					editor.execute( parentCommandName );
					editor.execute( 'listStyle', { type } );
				} );
			}

			editor.editing.view.focus();
		} );

		return button;
	};
}
