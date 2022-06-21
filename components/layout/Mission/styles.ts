import styled from 'styled-components';
import { device } from '../../../styles/breakPoints';


export const ParagraphMission = styled.p`
    width: 85%;
    text-align: center;
    font-size: 22px;
    font-style: italic;
    color: white;
    padding: 22px 0;
        ${device.sm`
                font-size: 14px !important;
        `};
`;

export const MissionContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 60px;
`;

export const MissionWrapper = styled.div`
    width: 100%;
    background: black;
    height: 380px;
    max-width: 85rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


export const InfoGray = styled.p`
    font-size: 16px;
    font-weight: 500; 
    font-family: Inter;
    color: #718176;
`;

export const HeadingMission = styled.p`
    color: white;
    font-size: 40px;
    padding-top: 50px;
    padding-bottom: 10px;
`;

export const CeoParagraph = styled.p`
    color: white;
    font-size: 20;
    font-weight: 700;
    font-family: Lato;
`;
