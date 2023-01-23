---
layout: article
title: Trend Micro Sample Configuration
permalink: /user-guide/security/trend-micro-configuration-sample/
image: https://dytvr9ot2sszz.cloudfront.net/logz-docs/social-assets/docs-social.jpg
description: Trend Micro Sample Configuration
tags:
  - security
  - siem
  - trend micro configuration
  - xml
contributors:
  - dorisnaaman
---

```xml
<?xml version="1.0" encoding="utf-8"?>
<Export type="SecurityProfile" date="August 31, 2020 18:20" version="20.0.140">
	<SecurityProfiles>
		<SecurityProfile id="134">
			<TBUID></TBUID>
			<Name>Trend_Policy</Name>
			<Description></Description>
			<ScheduleID isNull="true"/>
			<MultipleInterfaceTypes>false</MultipleInterfaceTypes>
			<CountersReset isNull="true"/>
			<DetectionEngineState>-1</DetectionEngineState>
			<OnAssignCustomAction></OnAssignCustomAction>
			<OnUnassignCustomAction></OnUnassignCustomAction>
			<AutoRequiresUpdate>-1</AutoRequiresUpdate>
			<ParentSecurityProfileID isNull="true"/>
			<AntiMalwareSecurityProfile id="134">
				<SecurityProfileID>134</SecurityProfileID>
				<AntiMalwareState>0</AntiMalwareState>
				<Setting name="com.trendmicro.ds.antimalware:settings.configuration.webReputationEnabled" value="true"/>
			</AntiMalwareSecurityProfile>
			<AppControlSecurityProfile id="134">
				<SecurityProfileID>134</SecurityProfileID>
				<AppControlState>-1</AppControlState>
				<RulesetID isNull="true"/>
				<Lockdown isNull="true"/>
				<WhitelistMode isNull="true"/>
			</AppControlSecurityProfile>
			<IntegritySecurityProfile id="134">
				<SecurityProfileID>134</SecurityProfileID>
				<SystemIntegrityState>0</SystemIntegrityState>
			</IntegritySecurityProfile>
			<LogInspectionSecurityProfile id="134">
				<SecurityProfileID>134</SecurityProfileID>
				<LogInspectionState>0</LogInspectionState>
			</LogInspectionSecurityProfile>
			<NetworkSecurityProfile id="134">
				<SecurityProfileID>134</SecurityProfileID>
				<StatefulFilterID>2</StatefulFilterID>
				<NetworkControlState>0</NetworkControlState>
				<VulnerabilityShieldState>0</VulnerabilityShieldState>
			</NetworkSecurityProfile>
			<ContainerControlSecurityProfile id="134">
				<SecurityProfileID>134</SecurityProfileID>
				<ContainerControlState>-1</ContainerControlState>
				<UnscannedImagesAction isNull="true"/>
				<VulExceedThresholdAction isNull="true"/>
				<VulThrDefcon1Count isNull="true"/>
				<VulThrCriticalCount isNull="true"/>
				<VulThrHighCount isNull="true"/>
				<VulThrMediumCount isNull="true"/>
				<VulThrLowCount isNull="true"/>
				<VulThrNegligibleCount isNull="true"/>
				<VulThrUnknownCount isNull="true"/>
				<MalwareDetectedAction isNull="true"/>
				<PrivilegedContainerAction isNull="true"/>
				<ForceDigestOnly isNull="true"/>
				<BlockImageImport isNull="true"/>
				<BlockImageLoad isNull="true"/>
				<RequiresActionUpdate>false</RequiresActionUpdate>
			</ContainerControlSecurityProfile>
		</SecurityProfile>
	</SecurityProfiles>
	<IPLists/>
	<PortLists/>
	<Schedules>
		<Schedule id="1">
			<TBUID>81CE70B6-EAC7-E485-309E-43AEC7C9FAE5</TBUID>
			<Name>Daily</Name>
			<Description>8 AM - 4 PM Monday-Friday</Description>
			<HourOfWeek>000000000000000000000000000000001111111100000000000000001111111100000000000000001111111100000000000000001111111100000000000000001111111100000000000000000000000000000000</HourOfWeek>
		</Schedule>
	</Schedules>
	<ScanCachePolicyObjects/>
	<ScanDirectoryLists/>
	<ScanFileLists>
		<ScanFileList id="1">
			<TBUID>744ED36D-37EB-9956-D745-BE1C9FD7BCCB</TBUID>
			<Name>Process Image Files (Windows)</Name>
			<Description></Description>
			<Items>C:\Windows\system32\wbem\wmiprvse.exe&lt;:&gt;C:\Program Files\Citrix\User Profile Manager\UserProfileManager.exe&lt;:&gt;C:\Program Files\Citrix\Server Resource Management\Memory Optimization Management\Program\CtxSFOSvc.exe</Items>
			<Version></Version>
			<UserEdited>true</UserEdited>
		</ScanFileList>
	</ScanFileLists>
	<ScanFileExtLists/>
	<AntiMalwares>
		<AntiMalware id="4">
			<Name>Advanced Real-Time Scan Configuration</Name>
			<Description></Description>
			<FilesToScan>1</FilesToScan>
			<ScanFileExtID isNull="true"/>
			<ScanFilesActivitiy>3</ScanFilesActivitiy>
			<ScanCompressed>true</ScanCompressed>
			<ScanCompressedSmaller>30</ScanCompressedSmaller>
			<ScanCompressedLayer>2</ScanCompressedLayer>
			<ExcludedScanDirList isNull="true"/>
			<ExcludedScanFileList isNull="true"/>
			<ExcludedScanFileExtList isNull="true"/>
			<ScanAction>1</ScanAction>
			<ScanCustomAction1 isNull="true"/>
			<ScanCustomAction2 isNull="true"/>
			<Alert>true</Alert>
			<FoldersToScan>1</FoldersToScan>
			<ScanDirList isNull="true"/>
			<TBUID></TBUID>
			<UnScannableFileAction isNull="true"/>
			<IntelliTrapeEnabled>true</IntelliTrapeEnabled>
			<SpywareEnabled>true</SpywareEnabled>
			<ScanCustomActionForGeneric>0</ScanCustomActionForGeneric>
			<ConfigurationType>1</ConfigurationType>
			<ScanNetworkFolder>true</ScanNetworkFolder>
			<CpuUsage isNull="true"/>
			<ScanOLE>true</ScanOLE>
			<ScanOLEExploit>true</ScanOLEExploit>
			<ScanOLELayer>15</ScanOLELayer>
			<ScanActionForVirus isNull="true"/>
			<ScanActionForTrojans isNull="true"/>
			<ScanActionForPacker isNull="true"/>
			<ScanActionForSpyware isNull="true"/>
			<ScanActionForOtherThreats isNull="true"/>
			<ScanActionForCookie isNull="true"/>
			<ExcludedScanProcessFileList>1</ExcludedScanProcessFileList>
			<ScanCompressedNumberOfFiles>10</ScanCompressedNumberOfFiles>
			<ATSEDetectionEnabled>true</ATSEDetectionEnabled>
			<ATSEDetectionLevel>2</ATSEDetectionLevel>
			<ScanActionForAtseLevel1 isNull="true"/>
			<ScanActionForAtseLevel2 isNull="true"/>
			<ScanActionForAtseLevel3 isNull="true"/>
			<ScanActionForAtseLevel4 isNull="true"/>
			<CorrelativeScan>true</CorrelativeScan>
			<SuspiciousActivityDetection>true</SuspiciousActivityDetection>
			<RansomwareDetection>true</RansomwareDetection>
			<DocumentRecovery>true</DocumentRecovery>
			<RealtimeMemoryScan>true</RealtimeMemoryScan>
			<AntiExploit>true</AntiExploit>
			<ATSEDetectionOption>1</ATSEDetectionOption>
			<ScanActionOption>0</ScanActionOption>
			<TrendxScanEnabled>true</TrendxScanEnabled>
			<ScanActionForTrendX isNull="true"/>
			<ScanActionForBM isNull="true"/>
		</AntiMalware>
	</AntiMalwares>
	<SecurityProfileAntiMalwares>
		<SecurityProfileAntiMalware isBridge="true" id="101">
			<TBUID></TBUID>
			<SecurityProfileID>134</SecurityProfileID>
			<RealTime1_AntiMalwareID>4</RealTime1_AntiMalwareID>
			<RealTime2_AntiMalwareID isNull="true"/>
			<RealTime3_AntiMalwareID isNull="true"/>
			<RealTime4_AntiMalwareID isNull="true"/>
			<RealTime5_AntiMalwareID isNull="true"/>
			<Manual_AntiMalwareID isNull="true"/>
			<Scheduled_AntiMalwareID isNull="true"/>
			<RealTime1_ScheduleID>1</RealTime1_ScheduleID>
			<RealTime2_ScheduleID isNull="true"/>
			<RealTime3_ScheduleID isNull="true"/>
			<RealTime4_ScheduleID isNull="true"/>
			<RealTime5_ScheduleID isNull="true"/>
			<RealTimeEnableOveride>true</RealTimeEnableOveride>
			<ManualEnableOveride>false</ManualEnableOveride>
			<ScheduledEnableOveride>false</ScheduledEnableOveride>
		</SecurityProfileAntiMalware>
	</SecurityProfileAntiMalwares>
	<IntegrityRules/>
	<IntegrityRuleOverrides/>
	<IntegrityRuleMetadatas/>
	<IntegrityRuleMetadataOverrides/>
	<SecurityProfileIntegrityRules/>
	<LogInspectionRules/>
	<LogInspectionRuleOverrides/>
	<LogInspectionRuleMetadatas/>
	<LogInspectionRuleMetadataOverrides/>
	<SecurityProfileLogInspectionRules/>
	<MACLists/>
	<RuleContexts/>
	<PacketFilters/>
	<PacketFilterOverrides/>
	<StatefulFilters>
		<StatefulFilter id="2">
			<TBUID>3BF461CE-DD76-22EC-202D-8E983D7B2046</TBUID>
			<Name>Deep Security Manager Stateful</Name>
			<Description></Description>
			<DenyFragmentedPackets>false</DenyFragmentedPackets>
			<DenyTcpECNFlags>false</DenyTcpECNFlags>
			<EnableTCPStatefulInspection>true</EnableTCPStatefulInspection>
			<EnableTCPStatefulLogging>true</EnableTCPStatefulLogging>
			<AllowIncomingActiveFTP>false</AllowIncomingActiveFTP>
			<AllowOutgoingActiveFTP>false</AllowOutgoingActiveFTP>
			<AllowIncomingPassiveFTP>false</AllowIncomingPassiveFTP>
			<AllowOutgoingPassiveFTP>false</AllowOutgoingPassiveFTP>
			<LimitIncomingConnections>true</LimitIncomingConnections>
			<LimitIncomingConnectionsTo>100</LimitIncomingConnectionsTo>
			<LimitOutgoingConnections>true</LimitOutgoingConnections>
			<LimitOutgoingConnectionsTo>100</LimitOutgoingConnectionsTo>
			<LimitHalfOpenConnections>true</LimitHalfOpenConnections>
			<LimitHalfOpenConnectionsTo>100</LimitHalfOpenConnectionsTo>
			<EnableUDPStatefulInspection>true</EnableUDPStatefulInspection>
			<EnableUDPStatefulLogging>false</EnableUDPStatefulLogging>
			<EnableICMPStatefulInspection>true</EnableICMPStatefulInspection>
			<EnableICMPStatefulLogging>false</EnableICMPStatefulLogging>
			<SynFloodProtection>false</SynFloodProtection>
			<SynFloodProtectionThreshold>0</SynFloodProtectionThreshold>
			<AckStormProtection>true</AckStormProtection>
			<AckStormProtectionThreshold>300</AckStormProtectionThreshold>
			<AckStormDropConnection>true</AckStormDropConnection>
		</StatefulFilter>
	</StatefulFilters>
	<PayloadFilter2s/>
	<PayloadFilter2Overrides/>
	<PayloadFilter2Metadatas/>
	<PayloadFilter2MetadataOverrides/>
	<ConnectionTypes/>
	<ConnectionTypeOverrides/>
	<ConnectionTypeMetadatas/>
	<ConnectionTypeMetadataOverrides/>
	<SecurityProfilePacketFilters/>
	<SecurityProfilePacketFilterInterfaceTypes/>
	<SecurityProfileStatefulFilters/>
	<SecurityProfilePayloadFilter2s/>
	<SecurityProfilePayloadFilter2InterfaceTypes/>
	<SecurityProfileConnectionTypes/>
	<SecurityProfileConnectionTypeInterfaceTypes/>
	<InterfaceTypes/>
	<AdvancedSettings>
		<SecurityProfileSettings id="134">
			<Setting name="com.trendmicro.ds.network:settings.configuration.virtualInterfaceFWEnabled" value="true"/>
			<Setting name="com.trendmicro.ds.integrity:settings.configuration.syslogConfigurationID.INTEGRITY" value="0"/>
			<Setting name="com.trendmicro.ds.appcontrol:settings.configuration.syslogConfigurationID.APPCONTROL" value="0"/>
			<Setting name="com.trendmicro.ds.integrity:settings.configuration.detectionEngineStateAutoApplyIntegrityRules" value="1"/>
			<Setting name="com.trendmicro.ds.network:settings.configuration.packet.driver.settingsEnabled" value="false"/>
			<Setting name="com.trendmicro.ds.integrity:settings.configuration.systemIntegrityState" value="0"/>
			<Setting name="com.trendmicro.ds.integrity:settings.configuration.systemIntegrityState.on" value="true"/>
			<Setting name="settings.configuration.agentLogFlushInterval" value="10"/>
			<Setting name="com.trendmicro.ds.antimalware:settings.configuration.syslogConfigurationID.ANTIMALWARE" value="0"/>
			<Setting name="com.trendmicro.ds.loginspection:settings.configuration.detectionEngineStateAutoApplyLogInspectionRules" value="1"/>
			<Setting name="com.trendmicro.ds.antimalware:settings.configuration.webReputationSecurityLevel" value="80"/>
			<Setting name="settings.configuration.defaultHeartbeatPeriod" value="1"/>
			<Setting name="com.trendmicro.ds.loginspection:settings.configuration.syslogConfigurationID.LOGINSPECTION" value="0"/>
			<Setting name="com.trendmicro.ds.network:settings.configuration.networkControlState" value="0"/>
			<Setting name="com.trendmicro.ds.antimalware:settings.configuration.webReputationEnabled" value="true"/>
			<Setting name="com.trendmicro.ds.network:settings.configuration.detectionEngineStateAutoApplyDPIRules" value="1"/>
			<Setting name="com.trendmicro.ds.antimalware:settings.configuration.webReputationAlertingOn" value="true"/>
			<Setting name="com.trendmicro.ds.network:settings.configuration.vulnerabilityShieldState" value="0"/>
			<Setting name="com.trendmicro.ds.antimalware:settings.configuration.webReputationBlockUntestedPages" value="false"/>
			<Setting name="com.trendmicro.ds.antimalware:settings.configuration.syslogConfigurationID.WRS" value="0"/>
			<Setting name="settings.configuration.loggingOverride" value="3"/>
			<Setting name="com.trendmicro.ds.network:settings.configuration.syslogConfigurationID.PNP" value="0"/>
		</SecurityProfileSettings>
	</AdvancedSettings>
</Export>
```