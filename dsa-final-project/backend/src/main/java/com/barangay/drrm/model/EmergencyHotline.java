package com.barangay.drrm.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "emergency_hotlines")
public class EmergencyHotline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_type", nullable = false)
    private String groupType;

    @Column(name = "category")
    private String category;

    @Column(name = "agency_name", nullable = false)
    private String agencyName;

    @Column(name = "phone_number", nullable = false)
    private String phoneNumber;

    @Column(name = "display_order", nullable = false)
    private Integer displayOrder;

    public EmergencyHotline() {
    }

    public EmergencyHotline(String groupType, String category, String agencyName,
                            String phoneNumber, Integer displayOrder) {
        this.groupType = groupType;
        this.category = category;
        this.agencyName = agencyName;
        this.phoneNumber = phoneNumber;
        this.displayOrder = displayOrder;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupType() {
        return groupType;
    }

    public void setGroupType(String groupType) {
        this.groupType = groupType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Integer getDisplayOrder() {
        return displayOrder;
    }

    public void setDisplayOrder(Integer displayOrder) {
        this.displayOrder = displayOrder;
    }
}
