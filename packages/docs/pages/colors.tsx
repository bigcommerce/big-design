import { H1, Panel, Text } from '@bigcommerce/big-design';
import React, { Fragment } from 'react';

import { ColorCards } from '../components';
import {
  accentColors,
  additionalColors,
  fillsAndStrokesColors,
  statusDangerColors,
  statusSuccessColors,
  statusWarningColors,
  typeColors,
} from '../components/ColorCards';

const ColorsPage = () => {
  return (
    <>
      <H1>Colors</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          The BigDesign color system has five palette types named semantically for their use across
          the application. The color system is derived from the BigCommerce brand and provides a
          consistent user experience for our merchants and partners.
        </Text>
        <Text>
          BigDesign uses color tokens to manage colors within each palette and are named for their
          role or hierarchy in the palette. Color tokens improve communication between design and
          development and establish an organized use of color in the BigCommerce application.
        </Text>
      </Panel>

      <Panel header="Accent" headerId="accent">
        <Text>
          Accent colors are used for interactions or to denote an interaction has taken place.
          Common accent uses include buttons, icons, navigation, links and selections. Use accent
          colors sparingly to avoid confusion.
        </Text>

        <ColorCards colorCards={accentColors} />
      </Panel>

      <Panel header="Type" headerId="type">
        <Text>
          Type colors are used for text, iconography, and foreground elements in BigDesign
          interfaces.
        </Text>

        <ColorCards colorCards={typeColors} />
      </Panel>

      <Panel header="Fills and strokes" headerId="fills-and-strokes">
        <Text>
          Fills and strokes are used as the building blocks of BigDesign interfaces. They are used
          in combination to create layering of backgrounds, panels, overlays and hierarchical UI
          elements.
        </Text>

        <ColorCards colorCards={fillsAndStrokesColors} />
      </Panel>

      <Panel header="Status" headerId="status">
        <Text>
          Status colors are reserved to indicate a system status such as errors, success or
          warnings. These colors should be used sparingly and only for imformative purposes.
        </Text>

        <ColorCards colorCards={statusSuccessColors} />
        <ColorCards colorCards={statusDangerColors} />
        <ColorCards colorCards={statusWarningColors} />
      </Panel>

      <Panel header="Additional colors" headerId="additional-colors">
        <Text>
          Additional colors exist in the BigDesign color palette for edge cases and BigCommerce
          branding.
        </Text>

        <ColorCards colorCards={additionalColors} />
      </Panel>
    </>
  );
};

export default ColorsPage;
